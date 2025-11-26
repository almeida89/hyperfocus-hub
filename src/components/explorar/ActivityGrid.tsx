import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SlidersHorizontal, Clock, Users, Star, BookmarkPlus } from "lucide-react";
import { ActivityFilters, Activity, CATEGORIES } from "@/types/activity";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - em produção viria de uma API
const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    title: "Monte Sua Própria Bandeira",
    description: "Crie uma bandeira única para sua família ou cidade usando princípios de vexilologia e design.",
    category: "bandeiras",
    ageRange: "9-12",
    duration: "15-30",
    difficulty: "iniciante",
    type: "hands-on",
    participants: "1.2k",
    rating: 4.9,
    image: "🏴",
    tags: ["criativo", "design", "vexilologia"],
  },
  {
    id: "2",
    title: "Vulcão Caseiro: Reações Químicas",
    description: "Aprenda sobre reações químicas criando um vulcão em erupção com materiais caseiros seguros.",
    category: "ciencias",
    ageRange: "9-12",
    duration: "30-60",
    difficulty: "intermediario",
    type: "experimento",
    participants: "2.8k",
    rating: 4.8,
    image: "🌋",
    tags: ["química", "experimento", "STEM"],
  },
  {
    id: "3",
    title: "Desafio de Perspectiva 3D",
    description: "Aprenda técnicas profissionais de desenho em perspectiva de três pontos.",
    category: "desenho",
    ageRange: "13-15",
    duration: "30-60",
    difficulty: "avancado",
    type: "video",
    participants: "856",
    rating: 4.9,
    image: "🎨",
    tags: ["arte", "técnica", "perspectiva"],
  },
  {
    id: "4",
    title: "Quiz: Bandeiras da América do Sul",
    description: "Teste seus conhecimentos sobre as bandeiras dos países sul-americanos.",
    category: "bandeiras",
    ageRange: "6-8",
    duration: "5-15",
    difficulty: "iniciante",
    type: "jogo",
    participants: "3.5k",
    rating: 4.7,
    image: "🎮",
    tags: ["quiz", "geografia", "América do Sul"],
  },
  {
    id: "5",
    title: "Sistema Solar em Escala",
    description: "Construa um modelo do sistema solar entendendo as proporções reais entre planetas.",
    category: "astronomia",
    ageRange: "9-12",
    duration: "60+",
    difficulty: "intermediario",
    type: "projeto",
    participants: "1.8k",
    rating: 4.9,
    image: "🪐",
    tags: ["planetas", "escala", "modelo"],
  },
  {
    id: "6",
    title: "Robô Seguidor de Linha",
    description: "Construa e programe um robô simples que segue uma linha preta usando sensores.",
    category: "robotica",
    ageRange: "13-15",
    duration: "projeto",
    difficulty: "avancado",
    type: "hands-on",
    participants: "945",
    rating: 4.8,
    image: "🤖",
    tags: ["programação", "Arduino", "sensores"],
  },
  {
    id: "7",
    title: "História da Escrita Cuneiforme",
    description: "Descubra como surgiu um dos primeiros sistemas de escrita da humanidade.",
    category: "linguistica",
    ageRange: "16-18",
    duration: "15-30",
    difficulty: "intermediario",
    type: "leitura",
    participants: "567",
    rating: 4.6,
    image: "📜",
    tags: ["história", "escrita", "Mesopotâmia"],
  },
  {
    id: "8",
    title: "Pintura com Aquarela: Galáxias",
    description: "Técnicas de aquarela para criar belas galáxias e nebulosas coloridas.",
    category: "desenho",
    ageRange: "9-12",
    duration: "30-60",
    difficulty: "iniciante",
    type: "video",
    participants: "2.1k",
    rating: 4.8,
    image: "🌌",
    tags: ["aquarela", "galáxia", "técnica"],
  },
];

interface ActivityGridProps {
  filters: ActivityFilters;
  onToggleFilters: () => void;
  isFilterOpen: boolean;
}

const ActivityGrid = ({ filters, onToggleFilters, isFilterOpen }: ActivityGridProps) => {
  const [sortBy, setSortBy] = useState("relevancia");

  const filteredActivities = useMemo(() => {
    let result = MOCK_ACTIVITIES;

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (activity) =>
          activity.title.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query) ||
          activity.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter((activity) => filters.categories.includes(activity.category));
    }

    // Filter by age ranges
    if (filters.ageRanges.length > 0) {
      result = result.filter((activity) => filters.ageRanges.includes(activity.ageRange));
    }

    // Filter by durations
    if (filters.durations.length > 0) {
      result = result.filter((activity) => filters.durations.includes(activity.duration));
    }

    // Filter by difficulties
    if (filters.difficulties.length > 0) {
      result = result.filter((activity) => filters.difficulties.includes(activity.difficulty));
    }

    // Filter by types
    if (filters.types.length > 0) {
      result = result.filter((activity) => filters.types.includes(activity.type));
    }

    // Sort
    switch (sortBy) {
      case "mais-populares":
        result.sort((a, b) => parseFloat(b.participants) - parseFloat(a.participants));
        break;
      case "melhor-avaliacao":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "mais-recentes":
        // Mantém ordem atual (seria por data em produção)
        break;
      default:
        // relevancia
        break;
    }

    return result;
  }, [filters, sortBy]);

  const getCategoryColor = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId)?.color || "hsl(var(--primary))";
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-muted-foreground">
            {filteredActivities.length} {filteredActivities.length === 1 ? 'atividade encontrada' : 'atividades encontradas'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className="lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {isFilterOpen ? 'Ocultar' : 'Filtros'}
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="relevancia">Relevância</SelectItem>
              <SelectItem value="mais-populares">Mais Populares</SelectItem>
              <SelectItem value="melhor-avaliacao">Melhor Avaliação</SelectItem>
              <SelectItem value="mais-recentes">Mais Recentes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Activity Grid */}
      {filteredActivities.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-lg text-muted-foreground mb-2">Nenhuma atividade encontrada</p>
          <p className="text-sm text-muted-foreground">
            Tente ajustar os filtros para ver mais resultados
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <Link key={activity.id} to={`/atividade/${activity.id}`}>
              <Card
                className="group overflow-hidden border-2 hover:border-primary/50 transition-smooth cursor-pointer h-full"
              >
              <div className="aspect-video bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center text-6xl relative">
                {activity.image}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card"
                >
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <div 
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getCategoryColor(activity.category)}20`,
                      color: getCategoryColor(activity.category)
                    }}
                  >
                    {CATEGORIES.find(c => c.id === activity.category)?.label}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.difficulty}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {activity.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">{activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">{activity.participants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-xs">{activity.rating}</span>
                  </div>
                </div>
              </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityGrid;
