import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { ChildProfile, ActivityProgress, Achievement, WeeklyStats } from "@/types/dashboard";
import ChildSelector from "@/components/dashboard/ChildSelector";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import ActivityReport from "@/components/dashboard/ActivityReport";
import AchievementsList from "@/components/dashboard/AchievementsList";
import WeeklyChart from "@/components/dashboard/WeeklyChart";

// Mock data
const mockChildren: ChildProfile[] = [
  {
    id: '1',
    name: 'Lucas',
    age: 10,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    totalActivities: 24,
    completedActivities: 18,
    currentStreak: 7,
    totalPoints: 2450,
    level: 5,
  },
  {
    id: '2',
    name: 'Sofia',
    age: 12,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    totalActivities: 32,
    completedActivities: 28,
    currentStreak: 12,
    totalPoints: 3850,
    level: 7,
  },
];

const mockActivities: ActivityProgress[] = [
  {
    id: '1',
    activityTitle: 'Sistema Solar em 3D',
    category: 'Astronomia',
    startedAt: '2024-01-15T10:00:00Z',
    completedAt: '2024-01-16T15:30:00Z',
    status: 'completed',
    timeSpent: 125,
    rating: 5,
  },
  {
    id: '2',
    activityTitle: 'Bandeiras do Mundo',
    category: 'Geografia',
    startedAt: '2024-01-14T14:00:00Z',
    completedAt: '2024-01-14T16:00:00Z',
    status: 'completed',
    timeSpent: 90,
    rating: 4,
  },
  {
    id: '3',
    activityTitle: 'Vulcões e Geologia',
    category: 'Ciências',
    startedAt: '2024-01-13T09:00:00Z',
    status: 'in-progress',
    timeSpent: 45,
  },
  {
    id: '4',
    activityTitle: 'Robótica Básica',
    category: 'Robótica',
    startedAt: '2024-01-12T10:00:00Z',
    completedAt: '2024-01-13T12:00:00Z',
    status: 'completed',
    timeSpent: 180,
    rating: 5,
  },
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Primeira Atividade',
    description: 'Complete sua primeira atividade',
    icon: '🎯',
    category: 'Iniciante',
    isUnlocked: true,
    unlockedAt: '2024-01-05T10:00:00Z',
  },
  {
    id: '2',
    title: 'Sequência de Fogo',
    description: 'Mantenha uma sequência de 7 dias',
    icon: '🔥',
    category: 'Dedicação',
    isUnlocked: true,
    unlockedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '3',
    title: 'Explorador Espacial',
    description: 'Complete 5 atividades de astronomia',
    icon: '🚀',
    category: 'Astronomia',
    isUnlocked: true,
    unlockedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: '4',
    title: 'Cientista Junior',
    description: 'Complete 10 atividades de ciências',
    icon: '🔬',
    category: 'Ciências',
    isUnlocked: false,
    progress: 6,
    total: 10,
  },
  {
    id: '5',
    title: 'Mestre das Bandeiras',
    description: 'Identifique corretamente 50 bandeiras',
    icon: '🏳️',
    category: 'Geografia',
    isUnlocked: false,
    progress: 32,
    total: 50,
  },
  {
    id: '6',
    title: 'Maratonista',
    description: 'Passe 10 horas em atividades',
    icon: '⏱️',
    category: 'Tempo',
    isUnlocked: false,
    progress: 440,
    total: 600,
  },
];

const mockWeeklyData: WeeklyStats[] = [
  { day: 'Seg', activities: 2, timeSpent: 45 },
  { day: 'Ter', activities: 3, timeSpent: 90 },
  { day: 'Qua', activities: 1, timeSpent: 30 },
  { day: 'Qui', activities: 2, timeSpent: 60 },
  { day: 'Sex', activities: 4, timeSpent: 120 },
  { day: 'Sáb', activities: 3, timeSpent: 75 },
  { day: 'Dom', activities: 2, timeSpent: 50 },
];

const DashboardPais = () => {
  const [selectedChild, setSelectedChild] = useState(mockChildren[0].id);

  const child = mockChildren.find(c => c.id === selectedChild) || mockChildren[0];

  const handleExportReport = () => {
    // Simulated export functionality
    const report = {
      child: child.name,
      period: 'Último mês',
      activities: mockActivities,
      achievements: mockAchievements.filter(a => a.isUnlocked),
      stats: {
        totalActivities: child.totalActivities,
        completedActivities: child.completedActivities,
        currentStreak: child.currentStreak,
        totalPoints: child.totalPoints,
      },
    };
    
    console.log('Relatório exportado:', report);
    // In a real app, this would generate a PDF or CSV
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Dashboard <span className="gradient-gold bg-clip-text text-transparent">Parental</span>
                </h1>
                <p className="text-muted-foreground">
                  Acompanhe o progresso e conquistas do seu filho
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <ChildSelector
                  children={mockChildren}
                  selectedChild={selectedChild}
                  onSelectChild={setSelectedChild}
                />
                <Button variant="outline" onClick={handleExportReport}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4 space-y-8">
            {/* Overview Cards */}
            <ProgressOverview child={child} />

            {/* Tabs */}
            <Tabs defaultValue="activities" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="activities">Atividades</TabsTrigger>
                <TabsTrigger value="achievements">Conquistas</TabsTrigger>
                <TabsTrigger value="stats">Estatísticas</TabsTrigger>
              </TabsList>

              <TabsContent value="activities" className="space-y-6">
                <ActivityReport activities={mockActivities} />
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <AchievementsList achievements={mockAchievements} />
              </TabsContent>

              <TabsContent value="stats" className="space-y-6">
                <WeeklyChart data={mockWeeklyData} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-lg border bg-card">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Tempo Médio</h3>
                    </div>
                    <p className="text-2xl font-bold">47 min</p>
                    <p className="text-sm text-muted-foreground">por atividade</p>
                  </div>
                  
                  <div className="p-6 rounded-lg border bg-card">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Categoria Favorita</h3>
                    </div>
                    <p className="text-2xl font-bold">Astronomia</p>
                    <p className="text-sm text-muted-foreground">8 atividades</p>
                  </div>
                  
                  <div className="p-6 rounded-lg border bg-card">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Melhor Dia</h3>
                    </div>
                    <p className="text-2xl font-bold">Sexta-feira</p>
                    <p className="text-sm text-muted-foreground">4 atividades</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPais;
