import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Users, 
  Star, 
  Bookmark, 
  BookmarkCheck,
  Share2,
  ChevronLeft,
  Printer,
  Play,
  CheckCircle
} from "lucide-react";
import MaterialsList from "@/components/atividade/MaterialsList";
import StepsList from "@/components/atividade/StepsList";
import ActivityTimer from "@/components/atividade/ActivityTimer";
import PrintButton from "@/components/atividade/PrintButton";
import { CATEGORIES } from "@/types/activity";
import { toast } from "@/hooks/use-toast";
import { useGamification } from "@/contexts/GamificationContext";
import { celebrateActivity } from "@/lib/confetti";

// Mock data - em produção viria de uma API
const getActivityById = (id: string) => {
  const activities: Record<string, any> = {
    "1": {
      id: "1",
      title: "Monte Sua Própria Bandeira",
      description: "Crie uma bandeira única para sua família ou cidade usando princípios de vexilologia e design. Aprenda sobre simbolismo, cores e formas que tornam uma bandeira memorável e significativa.",
      longDescription: "Nesta atividade hands-on, você vai mergulhar no fascinante mundo da vexilologia - o estudo das bandeiras. Você aprenderá os princípios básicos do design de bandeiras, incluindo o uso eficaz de cores, formas geométricas e simbolismo. Ao final, terá criado sua própria bandeira original que conta uma história sobre você, sua família ou comunidade.",
      category: "bandeiras",
      ageRange: "9-12 anos",
      duration: "20-30 minutos",
      difficulty: "Iniciante",
      type: "Hands-on",
      participants: "1.2k",
      rating: 4.9,
      image: "🏴",
      materials: [
        "Papel branco A4 ou cartolina",
        "Lápis e borracha",
        "Régua",
        "Lápis de cor, canetinhas ou tintas",
        "Tesoura (opcional)",
        "Palito de churrasco ou varinha (opcional para montar)"
      ],
      steps: [
        {
          title: "Pesquise e Inspire-se",
          description: "Antes de começar, observe bandeiras que você gosta. Preste atenção nas cores, formas e símbolos usados. Anote o que torna essas bandeiras memoráveis.",
          duration: 5
        },
        {
          title: "Defina o Significado",
          description: "Decida o que sua bandeira vai representar. Pode ser sua família, cidade imaginária, clube ou país dos sonhos. Escreva 3-5 palavras que representam esses valores.",
          duration: 5
        },
        {
          title: "Escolha as Cores",
          description: "Selecione 2-4 cores principais. Lembre-se: cores têm significados (vermelho = coragem, azul = paz, verde = natureza, amarelo = riqueza). Use cores que representem seus valores.",
          duration: 3
        },
        {
          title: "Desenhe o Esboço",
          description: "Com lápis e régua, faça o esboço da sua bandeira. Use formas geométricas simples: listras, triângulos, cruzes, estrelas. Mantenha o design limpo e reconhecível.",
          duration: 7
        },
        {
          title: "Adicione Símbolos",
          description: "Se quiser, adicione um símbolo central que represente algo importante (estrela, animal, planta, objeto). Mantenha simples!",
          duration: 5
        },
        {
          title: "Finalize com Cores",
          description: "Pinte sua bandeira com as cores escolhidas. Use traços firmes e cores sólidas para um resultado profissional.",
          duration: 10
        },
        {
          title: "Apresente sua Criação",
          description: "Dê um nome à sua bandeira e escreva um pequeno texto explicando o significado das cores e símbolos escolhidos.",
          duration: 5
        }
      ],
      learningObjectives: [
        "Compreender princípios básicos de design e simbolismo",
        "Desenvolver habilidades de comunicação visual",
        "Praticar planejamento e execução de projetos criativos",
        "Aprender sobre significados culturais das cores"
      ],
      tips: [
        "Regra de ouro: Uma criança deve conseguir desenhar sua bandeira de memória",
        "Use no máximo 3-4 cores diferentes",
        "Evite textos ou letras - bandeiras devem ser reconhecíveis à distância",
        "Teste sua bandeira em tamanho pequeno para ver se ainda é reconhecível"
      ],
      relatedActivities: ["4", "2", "3"]
    }
  };
  
  return activities[id] || null;
};

const Atividade = () => {
  const { id } = useParams<{ id: string }>();
  const activity = id ? getActivityById(id) : null;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { addPoints, updateMissionProgress } = useGamification();

  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Atividade não encontrada</h1>
            <Link to="/explorar">
              <Button variant="hero">Voltar para Explorar</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryColor = CATEGORIES.find(c => c.id === activity.category)?.color || "hsl(var(--primary))";
  const categoryLabel = CATEGORIES.find(c => c.id === activity.category)?.label || activity.category;

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorite ? "A atividade foi removida da sua lista." : "Você pode acessar seus favoritos no seu perfil.",
    });
  };

  const handleShare = () => {
    // Atualizar progresso da missão de compartilhamento
    updateMissionProgress('share_projects');
    addPoints('share_project');
    
    if (navigator.share) {
      navigator.share({
        title: activity.title,
        text: activity.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para sua área de transferência.",
      });
    }
  };

  const handleCompleteActivity = () => {
    if (isCompleted) return;
    
    setIsCompleted(true);
    
    // Celebração visual!
    celebrateActivity();
    
    // Adicionar pontos e atualizar progresso das missões
    addPoints('activity_completed');
    updateMissionProgress('complete_activities');
    updateMissionProgress('earn_points', 100);
    
    toast({
      title: "🎉 Atividade Concluída!",
      description: "Parabéns! Você ganhou +100 pontos e progrediu nas missões!",
      duration: 5000,
    });
  };

  const totalDuration = activity.steps.reduce((acc: number, step: any) => acc + step.duration, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <Link to="/explorar" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
              <ChevronLeft className="h-4 w-4" />
              Voltar para Explorar
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${categoryColor}20`,
                      color: categoryColor
                    }}
                  >
                    {categoryLabel}
                  </div>
                  <Badge variant="outline">{activity.difficulty}</Badge>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    {activity.title}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">{activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-medium">{activity.participants} participantes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="font-medium">{activity.rating} / 5.0</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {!isCompleted ? (
                    <>
                      <Button 
                        variant="hero" 
                        size="lg"
                        onClick={() => setShowTimer(!showTimer)}
                      >
                        <Play className="h-5 w-5 mr-2" />
                        {showTimer ? "Ocultar Timer" : "Iniciar Atividade"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={handleCompleteActivity}
                        className="border-green-500 text-green-600 hover:bg-green-50"
                      >
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Marcar como Completa
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="hero" 
                      size="lg"
                      disabled
                      className="bg-green-500"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Atividade Concluída ✓
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleFavorite}
                  >
                    {isFavorite ? (
                      <BookmarkCheck className="h-5 w-5 mr-2" />
                    ) : (
                      <Bookmark className="h-5 w-5 mr-2" />
                    )}
                    {isFavorite ? "Favoritado" : "Favoritar"}
                  </Button>
                  <PrintButton activity={activity} />
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>

              {/* Timer (conditional) */}
              {showTimer && (
                <ActivityTimer 
                  totalDuration={totalDuration}
                  steps={activity.steps}
                />
              )}

              {/* Tabs Content */}
              <Tabs defaultValue="sobre" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                  <TabsTrigger value="sobre">Sobre</TabsTrigger>
                  <TabsTrigger value="materiais">Materiais</TabsTrigger>
                  <TabsTrigger value="passos">Passo a Passo</TabsTrigger>
                </TabsList>

                <TabsContent value="sobre" className="space-y-6 mt-6">
                  <Card className="p-6 border-2">
                    <h2 className="text-2xl font-bold mb-4">Sobre Esta Atividade</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {activity.longDescription}
                    </p>
                  </Card>

                  <Card className="p-6 border-2">
                    <h3 className="text-xl font-bold mb-4">Objetivos de Aprendizagem</h3>
                    <ul className="space-y-3">
                      {activity.learningObjectives.map((objective: string, index: number) => (
                        <li key={index} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-primary text-sm font-bold">{index + 1}</span>
                          </div>
                          <span className="text-muted-foreground">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-6 border-2 bg-primary/5">
                    <h3 className="text-xl font-bold mb-4">💡 Dicas Importantes</h3>
                    <ul className="space-y-2">
                      {activity.tips.map((tip: string, index: number) => (
                        <li key={index} className="text-muted-foreground flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </TabsContent>

                <TabsContent value="materiais" className="mt-6">
                  <MaterialsList materials={activity.materials} />
                </TabsContent>

                <TabsContent value="passos" className="mt-6">
                  <StepsList steps={activity.steps} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 border-2 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Informações Rápidas</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Faixa Etária:</span>
                    <span className="font-medium">{activity.ageRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duração Total:</span>
                    <span className="font-medium">{totalDuration} minutos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nível:</span>
                    <span className="font-medium">{activity.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="font-medium">{activity.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Materiais:</span>
                    <span className="font-medium">{activity.materials.length} itens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Passos:</span>
                    <span className="font-medium">{activity.steps.length} etapas</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2">
                <h3 className="text-lg font-bold mb-4">Atividades Relacionadas</h3>
                <div className="space-y-3">
                  {activity.relatedActivities.slice(0, 3).map((relatedId: string) => (
                    <Link 
                      key={relatedId}
                      to={`/atividade/${relatedId}`}
                      className="block p-3 rounded-lg border border-border hover:border-primary/50 transition-smooth"
                    >
                      <p className="text-sm font-medium">Atividade relacionada #{relatedId}</p>
                      <p className="text-xs text-muted-foreground mt-1">Clique para ver mais</p>
                    </Link>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Atividade;
