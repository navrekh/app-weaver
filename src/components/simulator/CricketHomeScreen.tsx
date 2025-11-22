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
          <div className="space-y-3">
            <Card className="p-4 bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-sm border-green-500/30 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    🇮🇳
                  </div>
                  <div>
                    <span className="font-bold text-sm">India</span>
                    <p className="text-xs text-muted-foreground">Playing</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">245/6</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    🇦🇺
                  </div>
                  <div>
                    <span className="font-bold text-sm">Australia</span>
                    <p className="text-xs text-muted-foreground">Chasing</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">180/4</span>
              </div>
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-xs font-semibold text-green-600">✓ India wins by 65 runs</p>
                <p className="text-xs text-muted-foreground mt-1">MCG • Final • 18.4 overs</p>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-500/10 to-red-500/10 backdrop-blur-sm border-border/50 shadow-lg hover-scale">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    🇵🇰
                  </div>
                  <div>
                    <span className="font-bold text-sm">Pakistan</span>
                    <p className="text-xs text-muted-foreground">Batting</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary">198/8</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    🏴󠁧󠁢󠁥󠁮󠁧󠁿
                  </div>
                  <div>
                    <span className="font-bold text-sm">England</span>
                    <p className="text-xs text-muted-foreground">All out</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">156</span>
              </div>
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-xs font-semibold text-primary">↗ Pakistan leads by 42 runs</p>
                <p className="text-xs text-muted-foreground mt-1">Lords • Day 2 • 45.2 overs</p>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-green-500/20 via-background to-blue-500/20 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Cricket Hub</h1>
        {tab === "live" && (
          <Badge variant="destructive" className="animate-pulse shadow-lg shadow-red-500/50">
            🔴 LIVE
          </Badge>
        )}
      </div>

      <div className="flex gap-2 rounded-full bg-background/60 backdrop-blur-xl border border-border/50 p-1 shadow-lg">
        <Button
          size="sm"
          variant={tab === "live" ? "default" : "ghost"}
          className="flex-1 rounded-full text-xs"
          onClick={() => setTab("live")}
        >
          🏏 Live
        </Button>
        <Button
          size="sm"
          variant={tab === "matches" ? "default" : "ghost"}
          className="flex-1 rounded-full text-xs"
          onClick={() => setTab("matches")}
        >
          📅 Matches
        </Button>
        <Button
          size="sm"
          variant={tab === "players" ? "default" : "ghost"}
          className="flex-1 rounded-full text-xs"
          onClick={() => setTab("players")}
        >
          👤 Players
        </Button>
        <Button
          size="sm"
          variant={tab === "stats" ? "default" : "ghost"}
          className="flex-1 rounded-full text-xs"
          onClick={() => setTab("stats")}
        >
          📊 Stats
        </Button>
      </div>

      {renderContent()}
    </div>
  );
};
