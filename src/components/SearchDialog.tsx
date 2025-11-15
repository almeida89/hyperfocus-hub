import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Clock, TrendingUp } from "lucide-react";
import { CATEGORIES } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearcDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SearcDialog = ({ open, onOpenChange }: SearcDialogProps) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    // Pesquisas populares
    const popularSearches = [
        "Bandeiras",
        "Ciências",
        "Desenho",
        "Astronomia",
        "Robótica",
    ];

    useEffect(() => {
        // Carrega pesquisas recentes em localStorage
        const stored = localStorage.getItem("recentSearches");
        if (stored) {
            try {
                setRecentSearches(JSON.parse(stored));
            } catch (e) {
                console.error("Falha ao analisar as pesquisas recentes");
            }
        }
    }, []);

    const saveRecentSearch = (query: string) => {
        if (!query.trim()) return;

        const trimmedQuery = query.trim().slice(0, 100); // Limite de 100 caracteres
        const updated = [
            trimmedQuery,
            ...recentSearches.filter((s) => s !== trimmedQuery),
        ].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
    };

    const handleSearch = (query: string) => {
        if (!query.trim()) return;

        const sanitizedQuery = query.trim().slice(0, 200); // Segurança: Limite de tamanho
        saveRecentSearch(sanitizedQuery);
        navigate("/explorar", { state: { searchQuery: sanitizedQuery } });
        onOpenChange(false);
        setSearchQuery("");
    };

    const handleCategoryClick = (categoryId: string) => {
        navigate("/explorar", { state: { selectedCategory: categoryId } });
        onOpenChange(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch(searchQuery);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-2xl">Buscar Atividades</DialogTitle>
                    <DialogDescription>
                        Pesquise por nome, categoria ou tags de interesse
                    </DialogDescription>
                </DialogHeader>

                {/* Entrada de Pesquisa */}
                <div className="px-6 py-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Digite para buscar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-10 h-12 text-base"
                            maxLength={200}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Buscas Recentes */}
                {recentSearches.length > 0 && (
                    <div className="px-6 pb-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-semibold text-muted-foreground">
                                Buscas Recentes
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {recentSearches.map((search) => (
                                <Button
                                    key={search}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSearch(search)}
                                    className="rounded-full"
                                >
                                    {search}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Buscas Populares */}
                <div className="px-6 pb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-muted-foreground">
                            Buscas Populares
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {popularSearches.map((search) => (
                            <Button
                                key={search}
                                variant="secondary"
                                size="sm"
                                onClick={() => handleSearch(search)}
                                className="rounded-full"
                            >
                                {search}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Categorias */}
                <div className="px-6 pb-6">
                    <div className="mb-3">
                        <span className="text-sm font-semibold text-muted-foreground">
                            Explorar por Categoria
                        </span>
                    </div>
                    <div className="grid grid-col-2 gap-2">
                        {CATEGORIES.map((category) => (
                            <Button
                                key={category.id}
                                variant="outline"
                                onClick={() => handleCategoryClick(category.id)}
                                className="justify-start h-auto py-3"
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full flex-shrink-0"
                                        style={{ background: category.color }}
                                    />
                                    <span className="text-sm">{category.label}</span>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearcDialog;
