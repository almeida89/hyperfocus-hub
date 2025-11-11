export interface ChildProfile {
    id: string;
    name: string;
    age: number;
    avatar: string;
    totalActivities: number;
    completedActivities: number;
    currentStreak: number;
    totalPoints: number;
    level: number;
}

export interface ActivityProgress {
    id: string;
    activityTitle: string;
    category: string;
    startedAt: string;
    completedAt?: string;
    status: 'in-progress' | 'completed' | 'abandoned';
    timeSpent: number; // minutes
    rating?: number;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string,
    category: string;
    unlockedAt?: string;
    isUnlocked: boolean;
    progress?: number;
    total?: number;
}

export interface WeeklyStats {
    day: string;
    activities: number;
    timeSpent: number;
}