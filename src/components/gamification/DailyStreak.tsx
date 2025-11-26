// Componente para exibir a sequência diária de atividades
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGamification } from '@/contexts/GamificationContext';
import { Flame } from 'lucide-react';

const DailyStreak = () => {
  const { profile } = useGamification();

  // Mensagens motivacionais baseadas no streak
  const getMessage = (streak: number) => {
    if (streak === 0) return 'Comece sua jornada hoje!';
    if (streak === 1) return 'Ótimo começo!';
    if (streak < 7) return 'Continue assim!';
    if (streak < 30) return 'Você está em chamas! 🔥';
    return 'Lendário! Continue forte!';
  };

  return (
    <Card className="bg-gradient-to-br from-orange-500/10 to-background border-orange-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Sequência Diária
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Flame className="h-12 w-12 text-orange-500" />
            <p className="text-5xl font-bold text-foreground">
              {profile.streak}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {profile.streak === 1 ? 'dia consecutivo' : 'dias consecutivos'}
          </p>
          <p className="text-lg font-medium text-foreground mt-4">
            {getMessage(profile.streak)}
          </p>
          
          {/* Progresso para a próxima recompensa de streak */}
          {profile.streak < 7 && (
            <p className="text-xs text-muted-foreground mt-2">
              Faltam {7 - profile.streak} dias para ganhar +200 pontos!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStreak;
