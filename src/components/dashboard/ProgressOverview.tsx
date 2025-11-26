import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChildProfile } from "@/types/dashboard";
import { Trophy, Target, Flame, Star } from "lucide-react";

interface ProgressOverviewProps {
  child: ChildProfile;
}

const ProgressOverview = ({ child }: ProgressOverviewProps) => {
    const completionRate = Math.round((child.completedActivities / child.totalActivities) * 100);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Atividades</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{child.completedActivities}/{child.totalActivities}</div>
                    <Progress value={completionRate} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">{completionRate}% concluídas</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sequência Atual</CardTitle>
                    <Flame className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{child.currentStreak} dias</div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Continue assim! 🔥
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pontos</CardTitle>
                    <Star className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{child.totalPoints}</div>
                    <p className="text-xs text-muted-foreground mt-2">
                        +250 esta semana
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Nível</CardTitle>
                    <Trophy className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">Nível {child.level}</div>
                        <Badge variant="secondary" className="text-xs">Explorador</Badge>
                    </div>
                    <Progress value={65} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">350/1000 para próximo nível</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProgressOverview;