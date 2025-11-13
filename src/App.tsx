// ====================================
// COMPONENTE PRINCIPAL (APP)
// ====================================
// Este arquivo configura:
// 1. Sistema de rotas (navegação entre páginas)
// 2. Provedores globais (context providers)
// 3. Componentes de notificação (toasts)

// === IMPORTAÇÕES DE COMPONENTES DE UI ===
import { Toaster } from "@/components/ui/toaster"; // Sistema de notificações (toast)
import { Toaster as Sonner } from "@/components/ui/sonner"; // Sistema alternativo de notificações
import { TooltipProvider } from "@/components/ui/tooltip"; // Provedor de tooltips (dicas)

// === IMPORTAÇÕES DE GERENCIAMENTO DE DADOS ===
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Gerencia requisições de API

// === IMPORTAÇÕES DE NAVEGAÇÃO ===
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Sistema de rotas

// === IMPORTAÇÕES DE CONTEXTOS ===
import { GamificationProvider } from "@/contexts/GamificationContext"; // Contexto de gamificação

// === IMPORTAÇÕES DE PÁGINAS ===
import Index from "./pages/Index"; // Página inicial (homepage)
import Explorar from "./pages/Explorar"; // Página de exploração de atividades
import Atividade from "./pages/Atividade"; // Página de detalhes de uma atividade
import Comunidade from "./pages/Comunidade"; // Galeria da comunidade
import DashboardPais from "./pages/DashboardPais"; // Dashboard para pais
import Gamificacao from "./pages/Gamificacao"; // Página de gamificação
import NotFound from "./pages/NotFound"; // Página 404 (não encontrada)

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
