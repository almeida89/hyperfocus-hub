import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, User, Home, Compass, Users, Trophy, Heart, Icon } from "lucide-react";
import { Link } from "react-router-dom";
import PointsDisplay from "@/components/gamification/PointsDisplay";
import SearchDialog from "@/components/SearchDialog";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navItems = [
        { to: "/", label: "Início", icon: Home },
        { to: "/explorar", label: "Explorar", icon: Compass },
        { to: "/explorar", label: "Atividades", icon: Compass },
        { to: "/comunidade", label: "Comunidade", icon: Users },
        { to: "/gamificacao", label: "Gamificação", icon: Trophy },
        { to: "/dashboard-pais", label: "Para Pais", icon: Heart },
    ];

    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/">
                        <h1 className="text-2xl font-bold cursor-pointer">
                            <span className="gradient-gold bg-clip-text text-transparent">Hyperfocus</span>
                            <span className="text-foreground"> Hub</span>
                        </h1>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/explorar" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                            Explorar
                        </Link>
                        <Link to="/atividades" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                            Atividades
                        </Link>
                        <Link to="/comunidade" className="text-sm text-muted-foreground hover:text-foreground transitio-smooth">
                            Comunidade
                        </Link>
                        <Link to="/gamificacao" className="text-sm text-muted-foreground hover:text-foreground transitio-smooth">
                            Gamificação
                        </Link>
                        <Link to="/dashboard-pais" className="text-sm text-muted-foreground hover:text-foreground transitio-smooth">
                            Para Pais
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <PointsDisplay />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:inline-flex"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="sm" className="hidden md:inline-flex">
                        <User className="h-4 w-4 mr-2" />
                        Entrar
                    </Button>
                    <Button variant="hero" size="sm" className="hidden md:inline-flex">
                        Começar
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="text-left">
                                    <span className="gradient-gold bg-clip-text text-transparent">Hyperfocus</span>
                                    <span className="text-foreground">Hub</span>
                                </SheetTitle>
                            </SheetHeader>

                            <nav className="flex flex-col gap-4 mt-8">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link 
                                            key={item.to + item.label}
                                            to={item.to}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary/50 transition-smooth"
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="text-base font-medium">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-3">
                                <Button variant="outline" className="w-full">
                                    <User className="h-4 w-4 mr-2" />
                                    Entrar
                                </Button>
                                <Button variant="hero" className="w-full">
                                    Começar
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Search Dialog */}
            <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />                    
        </header>
    );
};

export default Header;
