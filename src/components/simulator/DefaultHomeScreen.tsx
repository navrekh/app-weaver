import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Star, Settings } from "lucide-react";

export const DefaultHomeScreen = () => {
  const [section, setSection] = useState<"home" | "features" | "settings">("home");

  const handleSelect = (next: "home" | "features" | "settings") => {
    setSection(next);
  };

  const renderDetails = () => {
    switch (section) {
      case "features":
        return (
          <Card className="p-4 mt-2 space-y-2">
            <p className="text-sm font-semibold">Key Features</p>
            <p className="text-xs text-muted-foreground">
              Describe your main user flows here – onboarding, core actions, and value.
            </p>
          </Card>
        );
      case "settings":
        return (
          <Card className="p-4 mt-2 space-y-2">
            <p className="text-sm font-semibold">Settings</p>
            <p className="text-xs text-muted-foreground">
              Toggle themes, notifications, and privacy options for your users.
            </p>
          </Card>
        );
      default:
        return (
          <Card className="p-4 mt-2 space-y-2">
            <p className="text-sm font-semibold">Home</p>
            <p className="text-xs text-muted-foreground">
              This is your main landing screen. Use it to highlight the primary action.
            </p>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <Smartphone className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome</h1>
        <p className="text-sm text-muted-foreground">Your app is ready to use</p>
      </div>

      <div className="space-y-3">
        <Card
          className="p-4 hover:bg-accent transition-colors cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => handleSelect("home")}
          onKeyDown={(e) => e.key === "Enter" && handleSelect("home")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Home</h3>
              <p className="text-sm text-muted-foreground">Main screen</p>
            </div>
          </div>
        </Card>

        <Card
          className="p-4 hover:bg-accent transition-colors cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => handleSelect("features")}
          onKeyDown={(e) => e.key === "Enter" && handleSelect("features")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Features</h3>
              <p className="text-sm text-muted-foreground">App features</p>
            </div>
          </div>
        </Card>

        <Card
          className="p-4 hover:bg-accent transition-colors cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => handleSelect("settings")}
          onKeyDown={(e) => e.key === "Enter" && handleSelect("settings")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Settings</h3>
              <p className="text-sm text-muted-foreground">Preferences</p>
            </div>
          </div>
        </Card>
      </div>

      {renderDetails()}
    </div>
  );
};
