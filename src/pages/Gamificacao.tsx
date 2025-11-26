// Página principal de gamificação - exibe todos os elementos do sistema
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LevelProgress from '@/components/gamification/LevelProgress';
import DailyStreak from '@/components/gamification/DailyStreak';
import Leaderboard from '@/components/gamification/Leaderboard';
import RewardsGallery from '@/components/gamification/RewardsGallery';
import MissionsPanel from '@/components/gamification/MissionsPanel';
import { useGamification } from '@/contexts/GamificationContext';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Gamificacao = () => {
  const { updateStreak, addPoints, updateMissionProgress } = useGamification();

  // Atualizar streak quando a página carrega
  useEffect(() => {
    updateStreak();
  }, []);

  // Função para simular conclusão de atividade (para demonstração)
  const handleSimulateActivity = () => {
    addPoints('activity_completed');
    updateMissionProgress('complete_activities');
    updateMissionProgress('earn_points', 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sistema de Gamificação
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete atividades, ganhe pontos, suba de nível e desbloqueie recompensas incríveis!
          </p>
          
          {/* Botão de demonstração - remover em produção */}
          <div className="mt-6">
            <Button onClick={handleSimulateActivity} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Simular Atividade Completa (+100 pts)
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Clique para testar o sistema de pontos
            </p>
          </div>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Nível e Progresso */}
          <div className="lg:col-span-2">
            <LevelProgress />
          </div>

          {/* Streak Diário */}
          <div>
            <DailyStreak />
          </div>
        </div>

        {/* Painel de Missões */}
        <div className="mb-8">
          <MissionsPanel />
        </div>

        {/* Ranking e Recompensas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ranking */}
          <div>
            <Leaderboard />
          </div>

          {/* Galeria de Recompensas */}
          <div>
            <RewardsGallery />
          </div>
        </div>

        {/* Informações sobre como ganhar pontos */}
        <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Como Ganhar Pontos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-foreground">Completar Atividade</p>
                <p className="text-sm text-muted-foreground">+100 pontos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-semibold text-foreground">Pontuação Perfeita</p>
                <p className="text-sm text-muted-foreground">+150 pontos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌅</span>
              <div>
                <p className="font-semibold text-foreground">Primeira Atividade do Dia</p>
                <p className="text-sm text-muted-foreground">+50 pontos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-semibold text-foreground">Streak de 7 Dias</p>
                <p className="text-sm text-muted-foreground">+200 pontos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-semibold text-foreground">Login Diário</p>
                <p className="text-sm text-muted-foreground">+10 pontos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="font-semibold text-foreground">Compartilhar Projeto</p>
                <p className="text-sm text-muted-foreground">+30 pontos</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gamificacao;
