import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";
import { useState } from "react";
import { Project, Comment } from "@/types/project";
import { toast } from "@/hooks/use-toast";

interface CommentsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: Project | null;
    comments: Comment[];
    onAddComment: (content: string) => void;
}

const CommentsDialog = ({ open, onOpenChange, project, comments, onAddComment }: CommentsDialogProps) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        onAddComment(newComment);
        setNewComment('');
        toast({
            title: "Comentário enviado",
            description: "Seu comentário está sendo analisado pela moderação.",
        });
    };

    if (!project) return null;

    const projectComments = comments.filter(c => c.projectId === project.id);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>{project.title}</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {projectComments.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                            Seja o primeiro a comentar!
                        </p>
                    ): (
                        projectComments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.authorAvatar} />
                                    <AvatarFallback>{comment.authorName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-sm">{comment.authorName}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                                        </span>
                                        {comment.isModerated && (
                                            <Badge variant="outline" className="text-xs">
                                                Moderado
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                    <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t">
                        <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escreva um comentário..."
                            rows={2}
                            className="flex-1"
                        />                        
                        <Button type="submit" size="icon" disabled={!newComment.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>                
            </DialogContent>
        </Dialog>
    );
};

export default CommentsDialog;