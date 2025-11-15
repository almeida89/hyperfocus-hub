import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    count: number;
}

const CategoryCard = ({ title, description, icon: Icon, color, count }: CategoryCardProps) =>{
    return (
        <Card className="group relative overflow-hidden border-2 border-border hover:border-primary/50 transition-smooth cursor-pointer bg-card">
            <div className="absolute top-0 right-0 w-32 opacity-10">
                <Icon className="w-full h-full" style={{ color }} />
            </div>

            <div className="relative p-6 space-y-4">
                <div className="flex items-start justify-between">
                    <div 
                        className="p-3 rounded-xl transition-smooth group-hover:scale-110"
                        style={{ backgroundColor: `${color}20`}}
                        >
                        <Icon className="w-6 h-6" style={{ color }}  />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                        {count}+ atividades
                    </span>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="pt-2">
                    <span className="text-sm font-medium text-primary group-hover:underline">
                    Explorar →
                    </span>
                </div>                
            </div>
        </Card>
    );
};

export default CategoryCard;

