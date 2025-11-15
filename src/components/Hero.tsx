import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
    const navigate = useNavigate();

    const tagToCategoryMap: Record<string, string> = {
        "Bandeiras": "bandeiras",
        "Ciências": "ciencias",
        "Desenho": "desenho",
        "Astronomia": "astronomia",
        "Robótica": "robotica"
    };

    const handleTagClick = (tag: string) => {
        const categoryId = tagToCategoryMap[tag];
        if (categoryId) {
            navigate('/explorar', { state: { selectedCategory: categoryId} });
        }
    };

    const handleSearch = () => {
        navigate('/explorar');
    };

    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 gradient-hero">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url(${heroBanner})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} 
                />
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Onde seus interesses ganham vida</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        <span className="text-white">Explore Seus</span>
                         <br />
                         <span className="gradient-gold bg-clip-text text-transparent">Interesses Profundos</span>   
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                        Um espaço dedicado para crianças e adultos com hiperfoco explorarem suas paixões através de atividades curadas, projetos e uma comunidade acolhedora.   
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="flex gap-2 p-2 bg-card rounded-lg border-2 border-primary/20 shadow-xl">
                            <div className="flex-1 flex items-center gap-2 px-3">
                                <Search className="h-5 w-5 text-muted-foreground" />
                                <Input  
                                    placeholder="Busque por bandeiras, ciências, astronomia, desenho..."
                                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-base"
                                />
                            </div>
                            <Button variant="hero" size="lg" onClick={handleSearch}>
                                Explorar
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                        <span className="text-muted-foreground">Populares</span>
                        {["Bandeiras", "Ciências", "Desenho", "Astronomia", "Robótica"].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className="px-3 py-1 rounded-full bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-smooth cursor-pointer"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
};

export default Hero;
