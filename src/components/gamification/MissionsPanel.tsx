// Componente para exibir missões diárias e semanais
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGamification } from '@/contexts/GamificationContext';
import { Mission } from '@/types/gamefication';
import { Gift, Clock } from 'lucide-react';

const MissionsPanel = () => {
  const { missions, claimMissionReward } = useGamification();

  // Separar missões por tipo
  const dailyMissions = missions.filter((m) => m.type === 'daily');
  const weeklyMissions = missions.filter((m) => m.type === 'weekly');

  // Função para calcular tempo restante
  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  // Componente para renderizar uma missão
  const MissionCard = ({ mission }: { mission: Mission }) => {
    const progressPercentage = (mission.progress / mission.maxProgress) * 100;
    
    return (
      <Card className="p-4 hover:border-primary/50 transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-3xl">{mission.icon}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">{mission.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{mission.description}</p>
              
              {/* Barra de progresso */}
              <div className="space-y-1">
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{mission.progress} / {mission.maxProgress}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getTimeRemaining(mission.expiresAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recompensa */}
          <div className="text-right ml-3">
            <div className="text-sm font-semibold text-primary mb-2">
              +{mission.pointsReward} pts
            </div>
            
            {mission.isCompleted && (
              <Button 
                size="sm" 
                onClick={() => claimMissionReward(mission.id)}
                className="gap-1"
              >
                <Gift className="h-3 w-3" />
                Resgatar
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-foreground mb-1">Missões</h2>
        <p className="text-sm text-muted-foreground">
          Complete missões para ganhar recompensas extras!
        </p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="daily" className="gap-2">
            <span>🌅</span>
            Diárias ({dailyMissions.length})
          </TabsTrigger>
          <TabsTrigger value="weekly" className="gap-2">
            <span>📅</span>
            Semanais ({weeklyMissions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-3">
          {dailyMissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma missão diária disponível</p>
              <p className="text-sm">Novas missões em breve!</p>
            </div>
          ) : (
            dailyMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))
          )}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-3">
          {weeklyMissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma missão semanal disponível</p>
              <p className="text-sm">Novas missões em breve!</p>
            </div>
          ) : (
            weeklyMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MissionsPanel;
