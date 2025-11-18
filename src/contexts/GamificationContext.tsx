// Context para gerenciar o sistema de gamificação globalmente
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GamificationProfile, PointEvent, POINT_VALUES, calculatePointsForLevel, Reward, Mission } from '@/types/gamefication';
import { useToast } from '@/hooks/use-toast';
import { celebrateLevelUp, celebrateReward, celebrateMission } from '@/lib/confetti';

// Interface do contexto
interface GamificationContextType {
    profile: GamificationProfile;
    missions: Mission[];
    addPoints: (event: PointEvent, customAmount?: number) => void;
    unlockReward: (rewardId: string) => void;
    updateStreak: () => void;
    updateMissionProgress: (objectiveType: string, amount?: number) => void;
    clainMissionReward: (missionId: string) => void;
}

// Criar o contexto
const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

// Recompensas disponíveis no sistema
const INITIAL_REWARDS: Reward[] = [
    {
        id: 'reward_1',
        title: 'Explorador Iniciante',
        description: 'Complete sua primeira atividade',
        icon: '🌟',
        pointsRequired: 100,
        isUnlocked: false,
        category: 'bronze',
    },
    {
        id: 'reward_2',
        title: 'Artista em Formação',
        description: 'Complete 5 atividades de arte',
        icon: '🎨',
        pointsRequired: 500,
        isUnlocked: false,
        category: 'bronze',
    },
    {
        id: 'reward_3',
        title: 'Cientista Curioso',
        description: 'Complete 5 atividades de ciência',
        icon: '🔬',
        pointsRequired: 500,
        isUnlocked: false,
        category: 'bronze',
    },
    {
        id: 'reward_4',
        title: 'Mestre das Atividades',
        description: 'Alcance 1000 pontos',
        icon: '🏆',
        pointsRequired: 1000,
        isUnlocked: false,
        category: 'silver',
    },
    {
        id: 'reward_5',
        title: 'Streak de Fogo',
        description: 'Mantenha 7 dias consecutivos',
        icon: '🔥',
        pointsRequired: 700,
        isUnlocked: false,
        category: 'silver',
    },
    {
        id: 'reward_6',
        title: 'Compartilhador Social',
        description: 'Compartilhe 10 projetos',
        icon: '🤝',
        pointsRequired: 300,
        isUnlocked: false,
        category: 'silver',
    },
    {
        id: 'reward_7',
        title: 'Lenda das Atividades',
        description: 'Alcance 5000 pontos',
        icon: '👑',
        pointsRequired: 5000,
        isUnlocked: false,
        category: 'gold',
    },
    {
        id: 'reward_8',
        title: 'Perfeccionista',
        description: 'Complete 10 atividades com pontuação perfeita',
        icon: '💎',
        pointsRequired: 1500,
        isUnlocked: false,
        category: 'gold',
    },
    {
        id: 'reward_9',
        title: 'Mestre Supremo',
        description: 'Alcance o nível 20',
        icon: '⭐',
        pointsRequired: 10000,
        isUnlocked: false,
        category: 'platinum',
    },
];

// Perfil inicial
const INITIAL_PROFILE: GamificationProfile = {
    userId: 'user_1',
    points: 0,
    level: 1,
    currentLevelPoints: 0,
    nextLevelPoints: 100,
    totalActivitiesCompleted: 0,
    streak: 0,
    rewards: INITIAL_REWARDS,
};

// Função para gerar missões diárias
const generateDailyMissions = (): Mission[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() +1);
    tomorrow.setHours(0, 0, 0, 0);

    return[
        {
            id: 'daily_1',
            title: 'Completar 3 Atividades',
            description: 'Complete 3 atividades hoje',
            type: 'daily',
            icon: '✅',
            pointsReward: 150,
            progress: 0,
            maxProgress: 3,
            isCompleted: false,
            expiresAt: tomorrow.toISOString(),
        },
        {
            id: 'daily_2',
            title: 'Ganhar 200 Pontos',
            description: 'Acumule 200 pontos hoje',
            type: 'daily',
            icon: '⭐',
            pointsReward: 100,
            progress: 0,
            maxProgress: 200,
            isCompleted: false,
            expiresAt: tomorrow.toISOString(),
        },
        {
            id: 'daily_3',
            title: 'Compartilhar 1 Projeto',
            description: 'Compartilhe um projeto na comunidade',
            type: 'daily',
            icon: '🤝',
            pointsReward: 75,
            progress: 0,
            maxProgress: 1,
            isCompleted: false,
            expiresAt: tomorrow.toISOString(),
        },
    ];
};

// Função para gerar missões semanais
const generateWeeklyMissions = (): Mission[] => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(0, 0, 0, 0);

    return [
        {
            id: 'weekly_1',
            title: 'Completar 15 Atividades',
            description: 'Complete 15 atividades esta semana',
            type: 'weekly',
            icon: '🎯',
            pointsReward: 500,
            progress: 0,
            maxProgress: 15,
            isCompleted: false,
            expiresAt: nextWeek.toISOString(),
        },
        {
            id: 'weekly_2',
            title: 'Manter Streak de 7 Dias',
            description: 'Mantenha  um streak de 7 dias consecutivos',
            type: 'weekly',
            icon: '🎯',
            pointsReward: 400,
            progress: 0,
            maxProgress: 7,
            isCompleted: false,
            expiresAt: nextWeek.toISOString(),
        },
        {
            id: 'weekly_3',
            title: '5 Pontuações Perfeitas',
            description: 'Obtenha 5 pontuações perfeitas em atividades',
            type: 'weekly',
            icon: '🎯',
            pointsReward: 600,
            progress: 0,
            maxProgress: 5,
            isCompleted: false,
            expiresAt: nextWeek.toISOString(),
        },
    ];
};

// Provider de contexto
export const GamificationProvider = ({ children }: { children: ReactNode }) => {
    const { toast } = useToast();
    const [profile, setProfile] = useState<GamificationProfile>(INITIAL_PROFILE);
    const [missions, setMissions] = useState<Mission[]>([]);

    // Carregar dados do localStorage quando o componente monta
    useEffect(() => {
        const savedProfile = localStorage.getItem('gamification_profile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }

        const savedMissions = localStorage.getItem('gamification_missions');
        if (savedMissions) {
            const parsedMissions = JSON.parse(savedMissions);
            // Verificar se missões expiraram
            const now = new Date();
            const validMissions = parsedMissions.filter((m: Mission) => new Date(m.expiresAt) > now);

            if (validMissions.length !== parsedMissions.length) {
                // Gerar novas missões se algumas expiraram
                const newDailyMissions = generateDailyMissions();
                const newWeeklyMissions = generateWeeklyMissions();
                setMissions([...newDailyMissions, ...newWeeklyMissions]);
            } else {
                setMissions(validMissions);
            } 
        } else {
        // Gerar missões iniciais
        const newDailyMissions = generateDailyMissions();
        const newWeeklyMissions = generateWeeklyMissions();
        setMissions([...newDailyMissions, ...newWeeklyMissions]);
        }
    }, []);

    // Salvar dados no localStorage sempre que o perfil mudar
    useEffect(() => {
        localStorage.setItem('gamification_profile', JSON.stringify(profile));
    }, [profile]);

    // Salvar missões no localStorage
    useEffect(() => {
        localStorage.setItem('gamification_missions', JSON.stringify(missions));
    }, [missions]);

    // Função para adicionar pontos
    const addPoints = (event: PointEvent, customAmount?: number) => {
        const pointsToAdd = customAmount || POINT_VALUES[event];

        setProfile((prev) => {
            const newPoints = prev.points + pointsToAdd;
            const newCurrentLevelPoints = prev.currentLevelPoints + pointsToAdd;

            // Calcular se subiu de nível
            let newLevel = prev.level;
            let remainingPoints = newCurrentLevelPoints;
            let nextLevelPoints = prev.nextLevelPoints;

            // Loop para verificar múltiplos níveis (se ganhar pontos suficientes)
            while (remainingPoints >= nextLevelPoints) {
                remainingPoints -= nextLevelPoints;
                newLevel++;
                nextLevelPoints = calculatePointsForLevel(newLevel);

                // Celebração de nível!
                celebrateLevelUp();

                // Mostrar notificação de nível subido
                toast({
                    title: '🎉 Nível Subido!',
                    description: `Parabéns! Você alcançou o nível ${newLevel}!`,
                    duration: 5000,
                });
            }

            // Verificar recompensas desbloqueadas
            const updatedRewards = prev.rewards.map((reward) => {
                if (!reward.isUnlocked && newPoints >= reward.pointsRequired){
                    // Celebração de recompensa!
                    celebrateReward(reward.category);

                    // Mostrar notificação de recompensa desbloqueada
                    toast({
                        title: '🏆 Recompensa Desbloqueada!',
                        description: `${reward.icon} ${reward.title}`,
                        duration: 5000,
                    });

                    return {
                        ...reward,
                        isUnlocked: true,
                        unlockedAt: new Date().toISOString(),
                    };
                }
                return reward;
            });

            // Mostrar notificação de pontos ganhos
            toast({
                title: `+${pointsToAdd} pontos!`,
                description: `Total: ${newPoints} pontos`,
            });

            return {
                ...prev,
                points: newPoints,
                level: newLevel,
                currentLevelPoints: remainingPoints,
                nextLevelPoints,
                rewards: updatedRewards,
                totalActivitiesCompleted: event === 'activity_completed' 
                ? prev.totalActivitiesCompleted + 1 
                : prev.totalActivitiesCompleted,
            };
        });
    };

    // Função para desbloquear recompensa manualmente (não usado, mas pode ser útil)
    const unlockReward = (rewardId: string) => {
        setProfile((prev) => ({
            ...prev,
            rewards: prev.rewards.map((reward) =>
            reward.id === rewardId 
            ? { ...reward, isUnlocked: true, unlockedAt: new Date().toISOString() } 
            : reward 
        ),
    }));
    };

    // Função para atualizar streak diário
    const updateStreak = () => {
        const today = new Date().toDateString();
        const lastActivity = profile.lastActivityDate 
        ? new Date(profile.lastActivityDate).toDateString() 
        : null;

        setProfile((prev) => {
            // Se é um novo dia
            if (lastActivity !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() -1);
                const yesterdayStr = yesterday.toDateString();

                // Se a última atividade foi ontem, incrementa um streak
                const newStreak = lastActivity === yesterdayStr ? prev.streak +1 : 1;

                // Recompensapor streak de 7 dias
                if (newStreak === 7) {
                    addPoints('week_streak');
                } else {
                    // Recompensa diária
                    addPoints('daily_login');
                }

                // Atualizar progresso da missão de streak
                updateMissionProgress('maintain_streak', newStreak);

                return {
                    ...prev,
                    streak: newStreak,
                    lastActivityDate: new Date().toISOString(),
                };
            }

            return prev;
        });
    };

    // Função para atualizar progresso de missões
    const updateMissionProgress = (objectiveType: string, amount: number = 1) => {
        setMissions((prev) => 
            prev.map((mission) => {
                if (mission.isCompleted) return mission;

                let shouldUpdate = false;
                let newProgress = mission.progress;

                // Mapear tipo de objetivo para ID de missão
                if (objectiveType === 'complete_activities' && (mission.id.includes('daily_1') || mission.id.includes('weekly_1'))) {
                    shouldUpdate = true;
                    newProgress = mission.progress + amount;
                } else if (objectiveType === 'earn_points' && mission.id.includes('daily_2')) {
                    shouldUpdate = true;
                    newProgress = mission.progress + amount;
                }else if (objectiveType === 'share_projects' && mission.id.includes ('daily_3')) {
                    shouldUpdate = true;
                    newProgress = mission.progress + amount;
                }else if (objectiveType === 'maintain_streak' && mission.id.includes('weekly_2')) {
                    shouldUpdate = true;
                    newProgress = amount; // Para streak, substituimos o valor
                } else if (objectiveType === 'perfect_scores' && mission.id.includes('weekly_3')) {
                    shouldUpdate = true;
                    newProgress = mission.progress + amount;
                }

                if (shouldUpdate) {
                    const isCompleted = newProgress >= mission.maxProgress;

                    if (isCompleted && !mission.isCompleted) {
                        // Celebração de missão!
                        celebrateMission();

                        toast({
                            title: '🎉 Missão Completa!',
                            description: `${mission.icon} ${mission.title} - Clique para resgatar ${mission.pointsReward} pontos!`,
                            duration: 5000,
                        });
                    }

                    return {
                        ...mission,
                        progress: Math.min(newProgress, mission.maxProgress),
                        isCompleted,
                        completedAt: isCompleted ? new Date().toISOString() : undefined,
                    };
                }

                return mission;
            })
        );
    };

    // Função para resgatar recompensas de missão
    const clainMissionReward = (missionId: string) => {
        const mission = missions.find((m) => m.id === missionId);
        if (!mission || !mission.isCompleted) return;

        addPoints('activity_completed', mission.pointsReward);

        toast({
            title: '✨ Recompensa Resgatada!',
            description: `Você ganhou ${mission.pointsReward} pontos!`,
        });

        // Remover missão completada e resgatada
        setMissions((prev) => prev.filter((m) => m.id !== missionId));
    };

    return (
        <GamificationContext.Provider value={{
            profile,
            missions,
            addPoints,
            unlockReward,
            updateStreak,
            updateMissionProgress,
            clainMissionReward,
        }}>
            {children}
        </GamificationContext.Provider>
    );   
};

// Hook para usar o contexto
export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (!context) {
        throw new Error('useGamification deve ser usado dentro de GamificationProvider');
    }
    return context;
};
