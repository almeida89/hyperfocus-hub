import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Achievement } from "@/types/dashboard";
import { Lock } from "lucide-react";

interface AchievementsListProps {
  achievements: Achievement[];
}

const AchievementsList = ({ achievements }: AchievementsListProps) => {
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Conquistas</CardTitle>
          <Badge>{unlockedCount}/{totalCount}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                achievement.isUnlocked 
                  ? 'bg-card border-primary/20' 
                  : 'bg-muted/30 border-muted'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-3xl ${!achievement.isUnlocked && 'opacity-30'}`}>
                  {achievement.isUnlocked ? achievement.icon : <Lock className="h-8 w-8" />}
                </div>
                
                <div className="flex-1 space-y-1">
                  <h4 className={`font-semibold ${!achievement.isUnlocked && 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  
                  {achievement.isUnlocked && achievement.unlockedAt && (
                    <p className="text-xs text-primary">
                      Desbloqueada em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                  
                  {!achievement.isUnlocked && achievement.progress !== undefined && (
                    <div className="space-y-1 mt-2">
                      <Progress value={(achievement.progress / (achievement.total || 1)) * 100} />
                      <p className="text-xs text-muted-foreground">
                        {achievement.progress}/{achievement.total}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsList;
