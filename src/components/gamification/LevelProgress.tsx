// Componente para exibir o nível e progresso do usuário
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/contexts/GamificationContext';
import { Trophy, TrendingUp } from 'lucide-react';

const LevelProgress = () => {
  const { profile } = useGamification();
  
  // Calcular percentual de progresso para o próximo nível
  const progressPercentage = (profile.currentLevelPoints / profile.nextLevelPoints) * 100;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Seu Nível
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Exibição do nível atual */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Nível Atual</p>
            <p className="text-4xl font-bold text-primary">
              {profile.level}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Próximo Nível</p>
            <p className="text-2xl font-semibold text-foreground">
              {profile.level + 1}
            </p>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium text-foreground">
              {profile.currentLevelPoints} / {profile.nextLevelPoints} pts
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Estatísticas adicionais */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <TrendingUp className="h-4 w-4 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">
              {profile.points.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-muted-foreground">Pontos Totais</p>
          </div>
          <div className="text-center">
            <Trophy className="h-4 w-4 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">
              {profile.totalActivitiesCompleted}
            </p>
            <p className="text-xs text-muted-foreground">Atividades</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelProgress;
