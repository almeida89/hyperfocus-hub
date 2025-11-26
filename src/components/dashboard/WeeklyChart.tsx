import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyStats } from "@/types/dashboard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface WeeklyChartProps {
  data: WeeklyStats[];
}

const WeeklyChart = ({ data }: WeeklyChartProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Atividade Semanal</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroked-muted" />
                        <XAxis
                            dataKey="day"
                            className="text-xs"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                            className="text-xs"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '0.5rem'
                            }}
                        />
                        <Legend />
                        <Bar 
                            dataKey="activities"
                            fill="hsl(var(--primary))"
                            name="Atividades"
                            radius={[8, 8, 0, 0]}
                        />
                        <Bar 
                            dataKey="timeSpent"
                            fill="hsl(var(--accent))"
                            name="Tempo (min)"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default WeeklyChart;