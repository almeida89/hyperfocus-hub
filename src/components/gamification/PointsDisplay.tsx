// Componente para exibir os pontos do usuário de forma compacta (header)
import { useGamification } from "@/contexts/GamificationContext";
import { Sparkles } from "lucide-react";

const PointsDisplay = () => {
    const { profile } = useGamification();

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">
                {profile.points.toLocaleString('pt-BR')}
            </span>
            <span className="text-xs text-muted-foreground">pts</span>
        </div>
    );
};

export default PointsDisplay;