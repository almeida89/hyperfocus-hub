const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">
                            <span className="gradient-gold bg-clip-text text-transparent">Hyperfocus</span>
                            <span className="text-foreground"> Hub</span>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Um espaço dedicado para explorar seus interesses profundos com segurança e criatividade.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Explorar</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Categorias</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Atividades</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Comunidade</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Projetos</a></li>
                            </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Recursos</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Para Pais</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Para Educadores</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Guias</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Blog</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Sobre</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Quem Somos</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Contato</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Privacidade</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Termos de Uso</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>@ {currentYear} Hyperfocus Hub - Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;