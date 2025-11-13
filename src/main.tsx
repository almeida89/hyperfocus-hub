// ====================================
// PONTO DE ENTRADA DA APLICAÇÃO
// ====================================
// Este arquivo é o primeiro a ser executado quando o site carrega
// Ele "monta" o componente App dentro do elemento HTML com id="root"

// Importa a função createRoot do React para renderizar a aplicação
import { createRoot } from "react-dom/client";

// Importa o componente principal da aplicação (App.tsx)
import App from "./App.tsx";

// Importa os estilos globais CSS (cores, fontes, etc)
import "./index.css";

// Cria a "raiz" da aplicação React no elemento HTML com id="root"
// O "!" diz ao TypeScript que temos certeza que o elemento existe
// render(<App />) - renderiza o componente App dentro do root
createRoot(document.getElementById("root")!).render(<App />);
