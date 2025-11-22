import { Navigation } from "@/components/Navigation";
import { PricingModal } from "@/components/PricingModal";
import { PublishModal } from "@/components/PublishModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Download, 
  Send, 
  Home, 
  FolderOpen, 
  History,
  Github,
  DollarSign,
  Plus
} from "lucide-react";

const Index = () => {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation 
        onPricingClick={() => setPricingOpen(true)}
        onPublishClick={() => setPublishOpen(true)}
      />
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
      <PublishModal open={publishOpen} onOpenChange={setPublishOpen} />
      
      {/* Main Dashboard Layout */}
      <div className="flex-1 flex overflow-hidden pt-16">
        {/* Left Sidebar */}
        <aside className="w-48 border-r border-border/50 bg-background/50 p-4 flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-accent text-accent-foreground transition-colors text-sm font-medium">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link to="/projects" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
            <FolderOpen className="w-4 h-4" />
            <span>My Projects</span>
          </Link>
          <Link to="/build-history" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
            <History className="w-4 h-4" />
            <span>Build History</span>
          </Link>
        </aside>

        {/* Center - Phone Preview */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-muted/20">
          <div className="flex gap-3 mb-6">
            <Button variant="outline" size="sm" className="glass">
              <Download className="w-4 h-4 mr-2" />
              Download APK
            </Button>
            <Button variant="outline" size="sm" className="glass">
              <Download className="w-4 h-4 mr-2" />
              Download IPA
            </Button>
          </div>
          
          {/* Phone Mockup */}
          <div className="relative w-[340px] h-[680px] bg-background border-8 border-foreground rounded-[3rem] shadow-2xl overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-foreground rounded-b-2xl z-10" />
            
            {/* Phone Content */}
            <div className="h-full bg-gradient-to-b from-background to-muted p-8 pt-14">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold">My App</h2>
                <div className="w-12 h-12 rounded-full bg-primary animate-pulse" />
              </div>
              
              <Card className="p-5 bg-background/80 border-border mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Welcome Screen</h3>
                    <p className="text-sm text-muted-foreground">Ready to use</p>
                  </div>
                </div>
              </Card>
              
              <p className="text-center text-base text-muted-foreground mt-12">
                Start by describing your app idea
              </p>

              <div className="flex gap-2 mt-auto pt-6">
                <Button variant="outline" size="sm" className="flex-1">
                  <span className="text-red-500 mr-2">🔴</span>
                  Sign In
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <span className="text-red-500 mr-2">🔴</span>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - AI Chat */}
        <aside className="w-96 border-l border-border/50 bg-card flex flex-col">
          <div className="p-4 border-b border-border/50 bg-card">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">AI Assistant</h3>
            </div>
          </div>
          
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-muted/30" style={{ maxHeight: 'calc(100vh - 280px)' }}>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
              <p className="text-sm text-foreground">Welcome to AppDev! Describe your app idea or paste a Figma URL to get started.</p>
              <p className="text-xs text-muted-foreground mt-1">6:22 PM</p>
            </div>
            
            <div className="bg-secondary border border-border rounded-lg p-3 ml-8">
              <p className="text-sm text-secondary-foreground">cricket app</p>
              <p className="text-xs text-muted-foreground mt-1 text-right">6:03 PM</p>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
              <p className="text-sm text-foreground">I'm generating your app based on "cricket app". Creating screens, components, and navigation...</p>
              <p className="text-xs text-muted-foreground mt-1">6:03 PM</p>
            </div>
          </div>
          
          <div className="p-4 border-t border-border/50 space-y-3 bg-card">
            <Button variant="outline" className="w-full glass justify-center">
              <Download className="w-4 h-4 mr-2" />
              Import Figma Design
            </Button>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Target Framework</p>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                  React Native
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Flutter
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Input 
                placeholder="Describe your app or paste Figma URL..." 
                className="glass bg-background text-foreground"
              />
              <Button size="icon" className="bg-primary hover:bg-primary/90 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              No preview yet. Trigger generation from the AI assistant.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;
