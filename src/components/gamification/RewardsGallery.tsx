// Componente para exibir todas as recompensas (desbloqueadas e bloqueadas)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/contexts/GamificationContext';
import { Lock, Gift } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RewardsGallery = () => {
  const { profile } = useGamification();

  // Separar recompensas por status
  const unlockedRewards = profile.rewards.filter((r) => r.isUnlocked);
  const lockedRewards = profile.rewards.filter((r) => !r.isUnlocked);

  // Função para obter a cor da categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bronze':
        return 'bg-amber-700/20 border-amber-700/30 text-amber-700';
      case 'silver':
        return 'bg-gray-400/20 border-gray-400/30 text-gray-600';
      case 'gold':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-600';
      case 'platinum':
        return 'bg-purple-500/20 border-purple-500/30 text-purple-600';
      default:
        return 'bg-muted border-muted-foreground/30';
    }
  };

  // Componente para renderizar uma recompensa
  const RewardCard = ({ reward, isUnlocked }: { reward: any; isUnlocked: boolean }) => {
    const progressPercentage = isUnlocked 
      ? 100 
      : Math.min((profile.points / reward.pointsRequired) * 100, 100);

    return (
      <div
        className={`p-4 rounded-lg border transition-all ${
          isUnlocked
            ? getCategoryColor(reward.category)
            : 'bg-muted/30 border-muted opacity-60'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Ícone da recompensa */}
          <div className={`text-4xl ${!isUnlocked && 'grayscale opacity-40'}`}>
            {isUnlocked ? reward.icon : <Lock className="h-10 w-10" />}
          </div>

          <div className="flex-1 space-y-2">
            {/* Título e categoria */}
            <div className="flex items-start justify-between gap-2">
              <h4 className={`font-semibold ${!isUnlocked && 'text-muted-foreground'}`}>
                {reward.title}
              </h4>
              <Badge variant="outline" className="text-xs uppercase">
                {reward.category}
              </Badge>
            </div>

            {/* Descrição */}
            <p className="text-sm text-muted-foreground">
              {reward.description}
            </p>

            {/* Status */}
            {isUnlocked ? (
              <p className="text-xs text-primary font-medium">
                ✓ Desbloqueada em{' '}
                {new Date(reward.unlockedAt).toLocaleDateString('pt-BR')}
              </p>
            ) : (
              <div className="space-y-1">
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {profile.points.toLocaleString('pt-BR')} /{' '}
                  {reward.pointsRequired.toLocaleString('pt-BR')} pontos
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Recompensas
          </CardTitle>
          <Badge>
            {unlockedRewards.length}/{profile.rewards.length}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Desbloqueie recompensas acumulando pontos!
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              Todas ({profile.rewards.length})
            </TabsTrigger>
            <TabsTrigger value="unlocked">
              Desbloqueadas ({unlockedRewards.length})
            </TabsTrigger>
            <TabsTrigger value="locked">
              Bloqueadas ({lockedRewards.length})
            </TabsTrigger>
          </TabsList>

          {/* Todas as recompensas */}
          <TabsContent value="all" className="space-y-3 mt-4">
            {profile.rewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                isUnlocked={reward.isUnlocked}
              />
            ))}
          </TabsContent>

          {/* Recompensas desbloqueadas */}
          <TabsContent value="unlocked" className="space-y-3 mt-4">
            {unlockedRewards.length > 0 ? (
              unlockedRewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} isUnlocked={true} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Lock className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>Nenhuma recompensa desbloqueada ainda.</p>
                <p className="text-sm">Complete atividades para ganhar pontos!</p>
              </div>
            )}
          </TabsContent>

          {/* Recompensas bloqueadas */}
          <TabsContent value="locked" className="space-y-3 mt-4">
            {lockedRewards.length > 0 ? (
              lockedRewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} isUnlocked={false} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Gift className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>Parabéns! Você desbloqueou todas as recompensas! 🎉</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RewardsGallery;
