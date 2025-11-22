import { Button } from "@/components/ui/button";
import { Smartphone, Github, DollarSign } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass">
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold">AppDev</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="ghost" size="sm">
              <DollarSign className="w-4 h-4 mr-2" />
              Pricing
            </Button>
            <Button variant="ghost" size="sm">
              Sign In/Sig up
            </Button>
            <Button variant="outline" size="sm" className="glass">
              + New Project
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Sign In / Sup
            </Button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">5 Credits</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
