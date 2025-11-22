import { Navigation } from "@/components/Navigation";
import { PricingModal } from "@/components/PricingModal";
import { PublishModal } from "@/components/PublishModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, FolderOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);

  // Mock projects data - would come from database in production
  const projects = [
    {
      id: 1,
      name: "Cricket App",
      lastEdited: "2 hours ago",
      thumbnail: "bg-gradient-to-br from-green-500 to-emerald-600",
      status: "In Progress"
    },
    {
      id: 2,
      name: "E-commerce Store",
      lastEdited: "1 day ago",
      thumbnail: "bg-gradient-to-br from-blue-500 to-cyan-600",
      status: "Published"
    },
    {
      id: 3,
      name: "Social Media App",
      lastEdited: "3 days ago",
      thumbnail: "bg-gradient-to-br from-purple-500 to-pink-600",
      status: "Draft"
    }
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
              <Link to="/">
                <div className={`${project.thumbnail} h-40 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <FolderOpen className="w-12 h-12 text-white/80" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {project.lastEdited}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'Published' ? 'bg-green-500/20 text-green-600' :
                    project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-600' :
                    'bg-gray-500/20 text-gray-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>

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
