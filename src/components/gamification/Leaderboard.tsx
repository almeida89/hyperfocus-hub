// Componente para exibir o ranking de usuários
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { LeaderboardEntry } from '@/types/gamefication';

// Dados mockados para demonstração (em produção viria do backend)
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Ana Silva',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    points: 5420,
    level: 12,
    rank: 1,
    activitiesCompleted: 54,
  },
  {
    id: '2',
    name: 'Pedro Santos',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    points: 4890,
    level: 11,
    rank: 2,
    activitiesCompleted: 48,
  },
  {
    id: '3',
    name: 'Maria Costa',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    points: 4320,
    level: 10,
    rank: 3,
    activitiesCompleted: 43,
  },
  {
    id: '4',
    name: 'João Oliveira',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
    points: 3750,
    level: 9,
    rank: 4,
    activitiesCompleted: 37,
  },
  {
    id: '5',
    name: 'Sofia Ferreira',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    points: 3210,
    level: 8,
    rank: 5,
    activitiesCompleted: 32,
  },
];

const Leaderboard = () => {
  // Função para obter o ícone da medalha baseado na posição
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return null;
    }
  };

  // Função para obter a cor do badge baseado na posição
  const getRankBadgeVariant = (rank: number): "default" | "secondary" | "outline" => {
    if (rank <= 3) return "default";
    return "secondary";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Ranking Global
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Veja quem está liderando a classificação!
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_LEADERBOARD.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                entry.rank <= 3
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-card border-border hover:bg-accent/50'
              }`}
            >
              {/* Posição no ranking */}
              <div className="flex items-center justify-center w-8">
                {getRankIcon(entry.rank) || (
                  <span className="text-lg font-bold text-muted-foreground">
                    {entry.rank}
                  </span>
                )}
              </div>

              {/* Avatar e informações do usuário */}
              <Avatar className="h-10 w-10">
                <AvatarImage src={entry.avatar} alt={entry.name} />
                <AvatarFallback>{entry.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {entry.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Nível {entry.level} • {entry.activitiesCompleted} atividades
                </p>
              </div>

              {/* Pontos */}
              <div className="text-right">
                <Badge variant={getRankBadgeVariant(entry.rank)}>
                  {entry.points.toLocaleString('pt-BR')} pts
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem de incentivo */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Complete mais atividades para subir no ranking! 🚀
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
