import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Star, Settings, Zap } from "lucide-react";

export const DefaultHomeScreen = () => {
  const [section, setSection] = useState<"home" | "features" | "settings">("home");

  const handleSelect = (next: "home" | "features" | "settings") => {
    setSection(next);
  };

  const renderDetails = () => {
    switch (section) {
      case "features":
        return (
          <Card className="p-5 mt-4 space-y-3 bg-background/60 backdrop-blur-xl border-border/50 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <p className="font-bold">Key Features</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <p className="text-muted-foreground">Fast and responsive interface</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <p className="text-muted-foreground">Beautiful modern design</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <p className="text-muted-foreground">Seamless user experience</p>
              </div>
            </div>
          </Card>
        );
      case "settings":
        return (
          <Card className="p-5 mt-4 space-y-3 bg-background/60 backdrop-blur-xl border-border/50 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <p className="font-bold">Settings</p>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                🔔 Notifications
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🎨 Appearance
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🔒 Privacy
              </Button>
            </div>
          </Card>
        );
      default:
        return (
          <Card className="p-5 mt-4 space-y-3 bg-background/60 backdrop-blur-xl border-border/50 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <p className="font-bold">Home</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Welcome to your app! This is your main landing screen where users will start their journey.
            </p>
            <Button size="sm" className="w-full">Get Started</Button>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 space-y-6">
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-primary/50 animate-fade-in">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Welcome</h1>
          <p className="text-sm text-muted-foreground">Your app is ready to use</p>
        </div>
      </div>

      <div className="space-y-3">
        <Card
          className="p-4 hover-scale cursor-pointer bg-background/60 backdrop-blur-sm border-border/50 shadow-lg transition-all"
          role="button"
          tabIndex={0}
          onClick={() => handleSelect("home")}
          onKeyDown={(e) => e.key === "Enter" && handleSelect("home")}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center shadow-lg">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Home</h3>
              <p className="text-xs text-muted-foreground">Main screen</p>
            </div>
            <div className="text-primary">→</div>
          </div>
        </Card>

        <Card
          className="p-4 hover-scale cursor-pointer bg-background/60 backdrop-blur-sm border-border/50 shadow-lg transition-all"
          role="button"
          tabIndex={0}
          onClick={() => handleSelect("features")}
          onKeyDown={(e) => e.key === "Enter" && handleSelect("features")}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Features</h3>
              <p className="text-xs text-muted-foreground">App features</p>
            </div>
            <div className="text-primary">→</div>
          </div>
        </Card>

        <Card
          className="p-4 hover-scale cursor-pointer bg-background/60 backdrop-blur-sm border-border/50 shadow-lg transition-all"
          role="button"
          tabIndex={0}
          onClick={() => handleSelect("settings")}
          onKeyDown={(e) => e.key === "Enter" && handleSelect("settings")}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Settings</h3>
              <p className="text-xs text-muted-foreground">Preferences</p>
            </div>
            <div className="text-primary">→</div>
          </div>
        </Card>
      </div>

      {renderDetails()}
    </div>
  );
};
