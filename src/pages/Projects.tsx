import { Navigation } from "@/components/Navigation";
import { PricingModal } from "@/components/PricingModal";
import { PublishModal } from "@/components/PublishModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, FolderOpen, Clock, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";

const Projects = () => {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const navigate = useNavigate();
  const { projects, isLoading, deleteProject, isDeleting } = useProjects();

  const handleResumeProject = (projectId: string) => {
    navigate('/', { state: { projectId } });
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-600';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-600';
      default:
        return 'bg-gray-500/20 text-gray-600';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onPricingClick={() => setPricingOpen(true)}
        onPublishClick={() => setPublishOpen(true)}
      />
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
      <PublishModal open={publishOpen} onOpenChange={setPublishOpen} />

      <div className="container px-4 mx-auto pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Projects</h1>
            <p className="text-muted-foreground">Manage and view all your app projects</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" size="lg" asChild>
            <Link to="/">
              <Plus className="w-5 h-5 mr-2" />
              New Project
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 animate-pulse mb-4" />
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => handleResumeProject(project.id)}
              >
                <div className="bg-gradient-to-br from-primary/60 to-primary h-40 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FolderOpen className="w-12 h-12 text-white/80" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDate(project.updated_at)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                    {project.status?.replace('_', ' ') || 'Draft'}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={(e) => handleDeleteProject(e, project.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </Card>
            ))}
          </div>
        )}

        {projects.length === 0 && (
          <div className="text-center py-20">
            <FolderOpen className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">Create your first app to get started</p>
            <Button className="bg-primary hover:bg-primary/90" size="lg" asChild>
              <Link to="/">
                <Plus className="w-5 h-5 mr-2" />
                Create Project
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
