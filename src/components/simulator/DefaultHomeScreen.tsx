import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Star, Settings } from "lucide-react";

export const DefaultHomeScreen = () => {
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
        <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
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

        <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
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

        <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
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
    </div>
  );
};
