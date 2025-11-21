import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, User } from "lucide-react";
import { Project } from "@/types/project";
import { useState } from "react";

interface ProjectCardProps {
    project: Project;
    onLike: (id: string) => void;
    onViewComments: (project: Project) => void;
}

const ProjectCard = ({ project, onLike, onViewComments }: ProjectCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="aspect-square relative overflow-hidden bg-muted">
                <img 
                    src= {project.image} 
                    alt= {project.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                        imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    } group-hover:scale-105`}
                    onLoad={() => setImageLoaded(true)} 
                />
                <Badge className="absolute top-3 left-3" variant="secondary">
                    {project.category}
                </Badge>
            </div>
            <CardContent className="p-4 space-y-3">
                <div>
                    <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {project.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Baseado em: {project.activityTitle}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{project.authorName}</span>
                    </div>
                    <span></span>
                    <span>{new Date(project.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onLike(project.id)}
                        className={project.isLiked ? 'text-destructive' : ''}
                    >
                        <Heart className={`h-4 w-4 mr-1 ${project.isLiked ? 'fill-current' : ''}`} />
                        {project.likes}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewComments(project)}
                    >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {project.commentCount}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;