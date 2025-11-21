import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Play,
    Pause,
    RotateCcw,
    SkipForward,
    Volume2,
    VolumeX,
} from "lucide-react";

interface Step {
    title: string;
    duration: number;
}

interface ActivityTimerProps {
    totalDuration: number;
    steps: Step[];
}

const ActivityTimer = ({ totalDuration, steps }: ActivityTimerProps) => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [timeLeft, setTimeLeft] = useState(steps[0]?.duration * 60 || 0);
    const [mode, setMode] = useState<"activity" | "pomodoro">("activity");
    const [soundEnable, setSoundEnable] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        if (soundEnable) {
                            playNotificationSound();
                        }
                        handleStepComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, currentStep, soundEnable]);

    const playNotificationSound = () => {
        const audio = new Audio(
            "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS67uiXSwgPUKXh8LFgGgU7k9nyz3QpBSh+zPLaizsKGGS67Oedx"
        );
    };

    const handleStepComplete = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setTimeLeft(steps[currentStep + 1].duration * 60);
        } else {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setCurrentStep(0);
        setTimeLeft(steps[0]?.duration * 60 || 0);
    };

    const handleSkip = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setTimeLeft(steps[currentStep + 1].duration * 60);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const currentStepDuration = steps[currentStep]?.duration * 60 || 1;
    const progress =
        ((currentStepDuration - timeLeft) / currentStepDuration) * 100;

    return (
        <Card className="p-6 border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Timer da Atividade</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSoundEnable(!soundEnable)}
                        className="h-8 w-8"
                    >
                        {soundEnable ? (
                            <Volume2 className="h-4 w-4" />
                        ) : (
                            <VolumeX className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                {/* Current Step */}
                <div className="text-center space-y-2">
                    <div className="text-sm text-muted-foreground">
                        Passo {currentStep + 1} de {steps.length}
                    </div>
                    <h4 className="text-lg font-semibold">{steps[currentStep]?.title}</h4>
                </div>

                {/* Timer Display */}
                <div className="text-center">
                    <div className="text-6xl font-bold gradient-gold bg-clip-text text-foreground">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Início</span>
                        <span>{Math.round(progress)}% completo</span>
                        <span>Fim</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleReset}
                        disabled={currentStep === 0 && timeLeft === steps[0]?.duration * 60}
                    >
                        <RotateCcw className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="hero"
                        size="lg"
                        onClick={() => setIsRunning(!isRunning)}
                        className="min-w-32"
                    >
                        {isRunning ? (
                            <>
                                <Pause className="h-5 w-5 mr-2" />
                                Pausar
                            </>
                        ) : (
                            <>
                                <Play className="h-5 w-5 mr-2" />
                                Iniciar
                            </>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleSkip}
                        disabled={currentStep === steps.length - 1}
                    >
                        <SkipForward className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex gap-1 justify-center">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 flex-1 rounded-full transition-all ${index < currentStep
                                    ? "bg-primary"
                                    : index === currentStep
                                        ? "bg-primary/50"
                                        : "bg-muted"
                                }`}
                        />
                    ))}
                </div>

                {/* Info */}
                <div className="text-center text-sm text-muted-foreground">
                    Tempo total estimado: {totalDuration} minutos
                </div>
            </div>
        </Card>
    );
};

export default ActivityTimer;
