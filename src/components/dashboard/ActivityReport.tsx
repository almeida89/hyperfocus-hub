import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActivityProgress } from "@/types/dashboard";
import { Clock, CheckCircle2, Circle } from "lucide-react";

interface ActivityReportProps {
    activities: ActivityProgress[];
}

const ActivityReport = ({ activities }: ActivityReportProps) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge className="bg-green-500">Concluída</Badge>;
            case 'in-progress':
                return <Badge variant="secondary">Em Progresso</Badge>;
            case 'abandoned':
                return <Badge variant="outline">Abandonada</Badge>;
            default:
                return null;
        }
    };

    const formatTime = (minutes: number) => {
        if (minutes < 60) return `${minutes}min`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Relatório de Atividades</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                            <div className="mt-1">
                                {activity.status === 'completed' ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ): (
                                    <Circle className="h-5 w-5 text-muted-foreground" />
                                )}
                            </div>

                            <div className="flex-1 space-y-1">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h4 className="font-semibold">{activity.activityTitle}</h4>
                                        <p className="text-sm text-muted-foreground">{activity.category}</p>
                                    </div>
                                    {getStatusBadge(activity.status)}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {formatTime(activity.timeSpent)}
                                    </div>
                                    <span>.</span>
                                    <span>{new Date(activity.startedAt).toLocaleDateString('pt-BR')}</span>
                                    {activity.rating && (
                                        <>
                                            <span>.</span>
                                            <span>⭐ {activity.rating}/5 </span>
                                        </>
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

export default ActivityReport;