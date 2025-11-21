import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Search } from "lucide-react";
import { Project, Comment, ProjectFilters } from "@/types/project";
import { CATEGORIES } from "@/types/activity";
import ProjectCard from "@/components/comunidade/ProjectCard";
import ProjectUploadDialog from "@/components/comunidade/ProjectUploadDialog";
import CommentsDialog from "@/components/comunidade/CommentsDialog";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Sistema Solar em Papel Machê',
    description: 'Construí todos os planetas com papel machê e pintei à mão. Aprendi muito sobre as proporções!',
    activityId: '1',
    activityTitle: 'Explorando o Sistema Solar',
    category: 'astronomia',
    authorName: 'Ana Silva',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',
    likes: 24,
    commentCount: 5,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Bandeira do Brasil com Materiais Recicláveis',
    description: 'Usei tampinhas de garrafa, papelão e tecidos antigos para criar a bandeira.',
    activityId: '2',
    activityTitle: 'Bandeiras do Mundo',
    category: 'bandeiras',
    authorName: 'Pedro Santos',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    image: 'https://images.unsplash.com/photo-1609151162377-794faf68b02f?w=800',
    likes: 18,
    commentCount: 3,
    createdAt: '2024-01-14T15:30:00Z',
  },
  {
    id: '3',
    title: 'Experiência de Vulcão em Erupção',
    description: 'Fiz o vulcão com argila e a erupção ficou incrível com bicarbonato e vinagre!',
    activityId: '3',
    activityTitle: 'Vulcões e Geologia',
    category: 'ciencias',
    authorName: 'Maria Costa',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    image: 'https://images.unsplash.com/photo-1581093458791-9d42e2d7f4c9?w=800',
    likes: 32,
    commentCount: 8,
    createdAt: '2024-01-13T09:15:00Z',
  },
];

const Comunidade = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [comments, setComments] = useState<Comment[]>([]);
  const [filters, setFilters] = useState<ProjectFilters>({
    categories: [],
    sortBy: 'recent',
    searchQuery: '',
  });
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleLike = (id: string) => {
    setProjects(projects.map(p => 
      p.id === id 
        ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked }
        : p
    ));
  };

  const handleUpload = (newProject: any) => {
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      authorName: 'Você',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      likes: 0,
      commentCount: 0,
      activityId: '1',
      activityTitle: newProject.activityTitle || 'Atividade Personalizada',
    };
    setProjects([project, ...projects]);
    toast({
      title: "Projeto publicado!",
      description: "Seu projeto está agora na galeria da comunidade.",
    });
  };

  const handleViewComments = (project: Project) => {
    setSelectedProject(project);
    setCommentsDialogOpen(true);
  };

  const handleAddComment = (content: string) => {
    if (!selectedProject) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      projectId: selectedProject.id,
      authorName: 'Você',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      content,
      createdAt: new Date().toISOString(),
      isModerated: true,
    };
    
    setComments([...comments, newComment]);
    setProjects(projects.map(p => 
      p.id === selectedProject.id 
        ? { ...p, commentCount: p.commentCount + 1 }
        : p
    ));
  };

  const toggleCategory = (categoryId: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(categoryId)
        ? filters.categories.filter(c => c !== categoryId)
        : [...filters.categories, categoryId],
    });
  };

  const filteredProjects = projects
    .filter(p => 
      (filters.categories.length === 0 || filters.categories.includes(p.category)) &&
      (filters.searchQuery === '' || 
        p.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'popular':
          return b.commentCount - a.commentCount;
        case 'mostLiked':
          return b.likes - a.likes;
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Galeria da <span className="gradient-gold bg-clip-text text-transparent">Comunidade</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Compartilhe seus projetos, inspire outros jovens curiosos e celebre suas conquistas!
              </p>
              <Button size="lg" onClick={() => setUploadDialogOpen(true)}>
                <Upload className="mr-2 h-5 w-5" />
                Compartilhar Projeto
              </Button>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="border-b bg-card/50 backdrop-blur-sm sticky top-[73px] z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar projetos..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  className="pl-10"
                />
              </div>
              
              <Select value={filters.sortBy} onValueChange={(value: any) => setFilters({ ...filters, sortBy: value })}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="popular">Mais Populares</SelectItem>
                  <SelectItem value="mostLiked">Mais Curtidos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {CATEGORIES.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={filters.categories.includes(cat.id) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleCategory(cat.id)}
                >
                  {cat.label}
                </Badge>
              ))}
              {filters.categories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters({ ...filters, categories: [] })}
                >
                  Limpar
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onLike={handleLike}
                  onViewComments={handleViewComments}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <ProjectUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUpload={handleUpload}
      />

      <CommentsDialog
        open={commentsDialogOpen}
        onOpenChange={setCommentsDialogOpen}
        project={selectedProject}
        comments={comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default Comunidade;
