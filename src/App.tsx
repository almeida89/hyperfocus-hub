// ====================================
// COMPONENTE PRINCIPAL (APP)
// ====================================
// Este arquivo configura:
// 1. Sistema de rotas (navegação entre páginas)
// 2. Provedores globais (context providers)
// 3. Componentes de notificação (toasts)

// === IMPORTAÇÕES DE COMPONENTES DE UI ===
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// === IMPORTAÇÕES DE GERENCIAMENTO DE DADOS ===
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 

// === IMPORTAÇÕES DE NAVEGAÇÃO ===
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

// === IMPORTAÇÕES DE CONTEXTOS ===
import { GamificationProvider } from "@/contexts/GamificationContext";

// === IMPORTAÇÕES DE PÁGINAS ===
import Index from "./pages/Index";
import Explorar from "./pages/Explorar";
import Atividade from "./pages/Atividade";
import Comunidade from "./pages/Comunidade";
import DashboardPais from "./pages/DashboardPais"; 
import Gamificacao from "./pages/Gamificacao"; 
import NotFound from "./pages/NotFound"; 

// Cria um cliente para gerenciar cache e estado de requisições
const queryClient = new QueryClient();

// Componente principal da aplicação
const App = () => (
  // QueryClientProvider: Fornece o cliente de queries para toda a aplicação
  <QueryClientProvider client={queryClient}>
    {/* GamificationProvider: Fornece o contexto de gamificação para toda a aplicação */}
    <GamificationProvider>
      {/* TooltipProvider: Fornece funcionalidade de tooltips */}
      <TooltipProvider>
        {/* Toaster: Mostra notificações do tipo toast */}
        <Toaster />
        {/* Sonner: Sistema alternativo de notificações */}
        <Sonner />
        
        {/* BrowserRouter: Habilita navegação no navegador */}
        <BrowserRouter>
          {/* Routes: Define todas as rotas da aplicação */}
          <Routes>
            {/* Rota principal - Página inicial */}
            <Route path="/" element={<Index />} />
            
            {/* Rota de exploração - Lista todas as atividades */}
            <Route path="/explorar" element={<Explorar />} />
            
            {/* Rota dinâmica - Detalhes de uma atividade específica */}
            {/* :id é um parâmetro dinâmico (ex: /atividade/1) */}
            <Route path="/atividade/:id" element={<Atividade />} />
            
            {/* Rota da comunidade - Galeria de projetos */}
            <Route path="/comunidade" element={<Comunidade />} />
            
            {/* Rota do dashboard parental */}
            <Route path="/dashboard-pais" element={<DashboardPais />} />
            
            {/* Rota da gamificação */}
            <Route path="/gamificacao" element={<Gamificacao />} />
            
            {/* ADICIONE TODAS AS ROTAS PERSONALIZADAS ACIMA DESTA LINHA */}
            
            {/* Rota catch-all - Captura qualquer URL não encontrada */}
            {/* O asterisco (*) significa "qualquer caminho" */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GamificationProvider>
  </QueryClientProvider>
);

export default App;
