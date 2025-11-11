export interface Activity {
    id: string;
    title: string;
    description: string;
    category: string;
    ageRange: string;
    duration: string;
    difficulty: string;
    type: string;
    participants: string;
    rating: number;
    image: string;
    tags: string[];
}

export interface ActivityFilters {
    categories: string[];
    ageRanges: string[];
    durations: string[];
    difficulties: string[];
    types: string[];
    searchQuery: string;
}

export const CATEGORIES = [
    { id:"bandeiras", label: "Bandeiras", color: "hsk(350, 85%, 60%)" },
    { id: "ciencias", label: "Ciências", color: "hsl(200, 100%, 60%)" },
    { id: "desenho", label: "Desenho & Arte", color: "hsl(280, 70%, 65%)" },
    { id: "astronomia", label: "Astronomia", color: "hsl(240, 80%, 65%)" },
    { id: "robotica", label: "Robótica", color: "hsl(25, 90%, 60%)" },
    { id: "linguistica", label: "Linguística", color: "hsl(160, 65%, 55%)" },
];

export const AGE_RANGES = [
    { id: "6-8", label: "6-8 anos" },
    { id: "9-12", label: "9-12 anos" },
    { id: "13-15", label: "13-15 anos" },
    { id: "16-18", label: "16-18 anos" },
    {id: "adulto", label: "Adulto" },
];

export const DURATIONS = [
    { id: "5-15", label: "5-15 min" },
    { id: "15-30", label: "15-30 min" },
    { id: "30-60", label: "30-60 min" },
    { id: "60+", label: "Mais de 1 hora" },
    { id: "projeto", label: "Projeto Longo"},
];

export const DIFFICULTIES = [
    { id: "iniciante", label: "Iniciante" },
    { id: "intermediario", label: "Intermediário" },
    { id: "avancado", label: "Avançadp" },
];

export const ACTIVITY_TYPES = [
    { id: "hands-on", label: "Hands-on" },
    { id: "leitura", label: "Leitura" },
    { id: "video", label: "Vídeo" },
    { id: "jogo", label: "Jogo/Quiz" },
    { id: "projeto", label: "Projeto" },
    { id: "experimento", label: "Experimento" },
];


