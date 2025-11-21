import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";
import { useState } from "react";

interface Step {
  title: string;
  description: string;
  duration: number;
}

interface StepsListProps {
  steps: Step[];
}

const StepsList = ({ steps }: StepsListProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleStepComplete = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const progress = (completedSteps.size / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card className="p-6 border-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Progresso</h3>
            <span className="text-sm font-medium text-primary">
              {completedSteps.size} de {steps.length} completos
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full gradient-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(index);
          const isNext = !isCompleted && !completedSteps.has(index - 1) && (index === 0 || completedSteps.has(index - 1));

          return (
            <Card 
              key={index} 
              className={`p-6 border-2 transition-smooth ${
                isCompleted 
                  ? 'bg-primary/5 border-primary/30' 
                  : isNext 
                  ? 'border-primary/50 shadow-md' 
                  : 'border-border'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${
                    isCompleted 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : isNext
                      ? 'border-primary text-primary'
                      : 'border-border text-muted-foreground'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${isCompleted ? 'text-muted-foreground' : ''}`}>
                        {step.title}
                      </h3>
                      <p className={`text-muted-foreground leading-relaxed ${isCompleted ? 'line-through' : ''}`}>
                        {step.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="flex-shrink-0">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration} min
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Checkbox
                      id={`step-${index}`}
                      checked={isCompleted}
                      onCheckedChange={() => handleStepComplete(index)}
                    />
                    <label
                      htmlFor={`step-${index}`}
                      className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {isCompleted ? 'Marcar como incompleto' : 'Marcar como completo'}
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {completedSteps.size === steps.length && (
        <Card className="p-6 border-2 border-primary bg-primary/5">
          <div className="text-center space-y-2">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-primary">Parabéns!</h3>
            <p className="text-muted-foreground">
              Você completou todos os passos desta atividade. Não se esqueça de compartilhar sua criação na comunidade!
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default StepsList;
