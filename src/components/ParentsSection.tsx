import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Heart, Sparkles } from "lucide-react";

const ParentsSection = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                            <Heart className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Para Pais e Educadores</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Apoie o <span className="gradient-gold bg-clip-text text-transparent">Hiperfoco</span> de Forma Segura
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Recursos cuidadosamente desenvolvidos para ajudar você a apoiar crianças e jovens com altas habilidades e hiperfoco em suas jornadas de aprendizado.
                        </p>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-foreground">Ambiente Seguro</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Controles parentais, moderação ativa e conteúdo aprovador por educadores.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-foreground">Guias Práticos</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Planos de aula, estratégias de apoio e recursos educacionais prontos para usar.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-foreground">Acompanhamento</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Monitore progresso, interesse e conquistas de forma simples e visual.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-4">
                            <Button variant="hero" size="lg">
                                Acessar Guia para Pais
                            </Button>
                            <Button variant="outline" size="lg">
                                Recursos Educacionais
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-6 space-y-2 bg-card border-2">
                            <div className="text-3xl font-bold text-primary">15k+</div>
                            <div className="text-sm text-muted-foreground">Pais e educadores</div>
                        </Card>
                        <Card className="p-6 space-y-2 bg-card border-2 mt-8">
                            <div className="text-3xl font-bold text-primary">98%</div>
                            <div className="text-sm text-muted-foreground">Taxa de satisfação</div>
                        </Card>
                        <Card className="p-6 space-y-2 bg-card border-2">
                            <div className="text-3xl font-bold text-primary">200+</div>
                            <div className="text-sm text-muted-foreground">Planos de aula</div>
                        </Card>
                        <Card className="p-6 space-y-2 bg-card border-2 mt-8">
                            <div className="text-3xl font-bold text-primary">24/7</div>
                            <div className="text-sm text-muted-foreground">Suporte disponível</div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ParentsSection;