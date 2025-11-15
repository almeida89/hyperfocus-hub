import CategoryCard from "./CategoryCard";
import { Flag, Beaker, Palette, Telescope, Bot, Languages } from "lucide-react";

const categories = [
  {
    title: "Bandeiras",
    description: "Explore bandeiras do mundo, suas histórias e significados através de jogos e projetos criativos.",
    icon: Flag,
    color: "hsl(350, 85%, 60%)",
    count: 45,
  },
  {
    title: "Ciências",
    description: "Experimentos, descobertas e projetos cientificos para mentes curiosas de todas as idades.",
    icon: Beaker,
    color: "hsl(200, 100%, 60%)",
    count: 78,
  },
  {
    title: "Desenho & Arte",
    description: "Técnicas, desafios e projetos artísticos para desenvolver suas habilidades criativas.",
    icon: Palette,
    color: "hsl(280, 70%, 65%)",
    count: 62,
  },
  {
    title: "Astronomia",
    description: "Explore o universo, planetas, estrelas e fenômenos celestes com atividades interativas.",
    icon: Telescope,
    color: "hsl(240, 80%, 65%)",
    count: 34,
  },
  {
    title: "Robótica",
    description: "Programação, eletrônica e construção de robôs para iniciantes e avançados.",
    icon: Bot,
    color: "hsl(25, 90%, 60%)",
    count: 41,
  },
  {
    title: "Linguistica",
    description: "Descubra idiomas, etimologia, sistemas de escrita e comunicação humana.",
    icon: Languages,
    color: "hsl(160, 65%, 55%)",
    count: 29,
  },
];

const CategoriesSection = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Escolha seu <span className="gradient-gold bg-clip-text text-transparent">Interesse</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Centenas de atividades organizadas por área de interesse. Comece explorando o que mais te fascina.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <CategoryCard key={category.title} {...category} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;

