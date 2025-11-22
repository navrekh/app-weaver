import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const CricketHomeScreen = () => {
  const [tab, setTab] = useState<"live" | "matches" | "players" | "stats">("live");

  const renderContent = () => {
    switch (tab) {
      case "matches":
        return (
          <div className="space-y-3 mt-2">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold">India vs Australia</p>
                <Badge variant="outline">T20</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Today • 7:30 PM</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold">Pakistan vs England</p>
                <Badge variant="outline">ODI</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Tomorrow • 3:00 PM</p>
            </Card>
          </div>
        );
      case "players":
        return (
          <Card className="p-4 mt-2">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Top Players</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>V. Kohli</span>
                <span className="font-medium">82* (54)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>B. Azam</span>
                <span className="font-medium">65 (48)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>J. Root</span>
                <span className="font-medium">4/28</span>
              </div>
            </div>
          </Card>
        );
      case "stats":
        return (
          <div className="grid grid-cols-2 gap-3 mt-2">
            <Card className="p-3 text-center">
              <p className="text-xs text-muted-foreground">Run Rate</p>
              <p className="text-lg font-bold">8.2</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xs text-muted-foreground">Wickets</p>
              <p className="text-lg font-bold">6</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xs text-muted-foreground">Overs</p>
              <p className="text-lg font-bold">18.4</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xs text-muted-foreground">Partnership</p>
              <p className="text-lg font-bold">54 (32)</p>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-3 mt-2">
            <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full" />
                  <span className="font-semibold">India</span>
                </div>
                <span className="text-lg font-bold">245/6</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary rounded-full" />
                  <span className="font-semibold">Australia</span>
                </div>
                <span className="text-lg font-bold">180/4</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">India wins by 65 runs</p>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent rounded-full" />
                  <span className="font-semibold">Pakistan</span>
                </div>
                <span className="text-lg font-bold">198/8</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-muted rounded-full" />
                  <span className="font-semibold">England</span>
                </div>
                <span className="text-lg font-bold">156/10</span>
              </div>
              <p className="text-sm text-primary mt-3">Pakistan leads by 42 runs</p>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cricket Hub</h1>
        {tab === "live" && (
          <Badge variant="destructive" className="animate-pulse">
            LIVE
          </Badge>
        )}
      </div>

      <div className="flex gap-2 rounded-full bg-muted p-1">
        <Button
          size="sm"
          variant={tab === "live" ? "default" : "ghost"}
          className="flex-1 rounded-full"
          onClick={() => setTab("live")}
        >
          Live
        </Button>
        <Button
          size="sm"
          variant={tab === "matches" ? "default" : "ghost"}
          className="flex-1 rounded-full"
          onClick={() => setTab("matches")}
        >
          Matches
        </Button>
        <Button
          size="sm"
          variant={tab === "players" ? "default" : "ghost"}
          className="flex-1 rounded-full"
          onClick={() => setTab("players")}
        >
          Players
        </Button>
        <Button
          size="sm"
          variant={tab === "stats" ? "default" : "ghost"}
          className="flex-1 rounded-full"
          onClick={() => setTab("stats")}
        >
          Stats
        </Button>
      </div>

      {renderContent()}
    </div>
  );
};
