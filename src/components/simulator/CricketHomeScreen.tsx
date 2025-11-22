import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CricketHomeScreen = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Live Matches</h1>
        <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
      </div>
      
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
            <div className="w-8 h-8 bg-green-500 rounded-full" />
            <span className="font-semibold">Pakistan</span>
          </div>
          <span className="text-lg font-bold">198/8</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500 rounded-full" />
            <span className="font-semibold">England</span>
          </div>
          <span className="text-lg font-bold">156/10</span>
        </div>
        <p className="text-sm text-primary mt-3">Pakistan leads by 42 runs</p>
      </Card>
    </div>
  );
};
