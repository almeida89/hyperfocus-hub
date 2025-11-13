// Interface para representar uma recompensa desbloqueável
export interface Reward {
  id: string;
  title: string; // Nome da recompensa
  description: string; // Descrição do que é a recompensa
  icon: string; // Emoji ou ícone da recompensa
  pointsRequired: number; // Pontos necessários para desbloquear
  isUnlocked: boolean; // Se já foi desbloqueada
  unlockedAt?: string; // Data de desbloqueio
  category: 'bronze' | 'silver' | 'gold' | 'platinum'; // Categoria da recompensa
}

// Interface para representar um usuário no ranking
export interface LeaderboardEntry {
  id: string;
  name: string; // Nome do usuário
  avatar: string; // Avatar do usuário
  points: number; // Total de pontos
  level: number; // Nível atual
  rank: number; // Posição no ranking
  activitiesCompleted: number; // Número de atividades completadas
}

// Interface para o perfil de gamificação do usuário
export interface GamificationProfile {
  userId: string;
  points: number; // Pontos totais acumulados
  level: number; // Nível atual
  currentLevelPoints: number; // Pontos no nível atual
  nextLevelPoints: number; // Pontos necessários para o próximo nível
  totalActivitiesCompleted: number; // Total de atividades completadas
  streak: number; // Dias consecutivos de uso
  lastActivityDate?: string; // Data da última atividade
  rewards: Reward[]; // Lista de todas as recompensas
}

// Tipos de eventos que dão pontos
export type PointEvent = 
  | 'activity_completed' // Completar uma atividade (+100 pontos)
  | 'first_activity' // Primeira atividade do dia (+50 pontos)
  | 'share_project' // Compartilhar projeto na comunidade (+30 pontos)
  | 'daily_login' // Login diário (+10 pontos)
  | 'perfect_score' // Atividade com pontuação perfeita (+150 pontos)
  | 'week_streak'; // 7 dias de streak (+200 pontos)

// Mapa de pontos por evento
export const POINT_VALUES: Record<PointEvent, number> = {
  activity_completed: 100,
  first_activity: 50,
  share_project: 30,
  daily_login: 10,
  perfect_score: 150,
  week_streak: 200,
};

// Fórmula para calcular pontos necessários por nível
// Nível 1->2: 100 pontos, Nível 2->3: 200 pontos, etc.
export const calculatePointsForLevel = (level: number): number => {
  return level * 100;
};

// Interface para representar uma missão
export interface Mission {
  id: string;
  title: string; // Título da missão
  description: string; // Descrição do objetivo
  type: 'daily' | 'weekly'; // Tipo da missão
  icon: string; // Emoji ou ícone
  pointsReward: number; // Recompensa em pontos
  progress: number; // Progresso atual (0-max)
  maxProgress: number; // Progresso necessário para completar
  isCompleted: boolean; // Se foi completada
  completedAt?: string; // Data de conclusão
  expiresAt: string; // Data de expiração
}

// Tipo de objetivo de missão
export type MissionObjective = 
  | 'complete_activities' // Completar X atividades
  | 'earn_points' // Ganhar X pontos
  | 'maintain_streak' // Manter X dias de streak
  | 'perfect_scores' // Conseguir X pontuações perfeitas
  | 'share_projects' // Compartilhar X projetos
  | 'explore_categories'; // Explorar X categorias diferentes
