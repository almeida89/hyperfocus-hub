import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";

const activities = [
    {
        title: "Monte sua própria bandeira",
        description: "Crie uma bandeira única para sua familia ou cidade, usando princípios de vexilologia.",
        duration: "20min",
        level: "Iniciante",
        participants: "1.2k",
        rating: 4.9,
        category: "Bandeiras",
        image: "🏴",
    },
    {
        title: "Vulcão Caseiro: Reações Quimícas",
        description: "Experimento científico seguro para criar um vulcão em erupção na sua cozinha.",
        duration: "30min",
        level: "Intermediário",
        participants: "2.8k",
        rating: 4.8,
        category: "Ciências",
        image: "🌋",
    },
    {
        title: "Desafio de Perspectiva 3D",
        description: "Aprenda a desenhar objetos em perspectiva de três pontos com técnicas profissionais.",
        duration: "45min",
        level: "Avançado",
        participants: "856",
        rating: 4.9,
        category: "Desenho",
        image: "🎨",
    },
];

const FeaturedActivities = () => {
    return (
        <section className="py-20 px-4 bg.muted/30">
            <div className="container mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Atividades em <span className="gradient-gold bg-clip-text text-transparent">Destaque</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Selecionadas pela comunidade e educadores. Comece agora mesmo!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {activities.map((activity) => (
                        <Card key={activity.title} className="group overflow-hidden border-2 hover:border-primary/50 transition-smooth cursor-pointer">
                            <div className="aspect-video bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center text-6xl">
                                {activity.image}
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                        {activity.category}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        {activity.level}
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth">
                                        {activity.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {activity.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                                    <div className="flex items-center gap-1">
                                        <Clock  className="w-4 h-4" />
                                        <span>{activity.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{activity.participants}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-primary text-primary" />
                                        <span>{activity.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedActivities