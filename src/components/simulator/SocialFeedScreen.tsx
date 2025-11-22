import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export const SocialFeedScreen = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Feed</h1>
      
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
          <div>
            <p className="font-semibold text-sm">Sarah Chen</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <p className="text-sm mb-3">Just launched my new app! So excited to share it with you all 🚀</p>
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg mb-3" />
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4 mr-1" />
            24
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-4 h-4 mr-1" />
            8
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full" />
          <div>
            <p className="font-semibold text-sm">Mike Johnson</p>
            <p className="text-xs text-muted-foreground">5 hours ago</p>
          </div>
        </div>
        <p className="text-sm mb-3">Beautiful sunset at the beach today 🌅</p>
        <div className="aspect-video bg-gradient-to-br from-orange-400 to-pink-400 rounded-lg mb-3" />
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4 mr-1" />
            156
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-4 h-4 mr-1" />
            23
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
