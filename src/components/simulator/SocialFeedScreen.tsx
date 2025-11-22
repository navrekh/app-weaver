import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export const SocialFeedScreen = () => {
  const [tab, setTab] = useState<"feed" | "messages" | "profile">("feed");
  const [likedFirst, setLikedFirst] = useState(false);
  const [likesFirst, setLikesFirst] = useState(24);

  const toggleLikeFirst = () => {
    setLikedFirst((prev) => !prev);
    setLikesFirst((prev) => (likedFirst ? prev - 1 : prev + 1));
  };

  const renderFeed = () => (
    <div className="space-y-4 mt-2">
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-full" />
          <div>
            <p className="font-semibold text-sm">Sarah Chen</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <p className="text-sm mb-3">Just launched my new app! So excited to share it with you all 🚀</p>
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg mb-3" />
        <div className="flex gap-4">
          <Button
            variant={likedFirst ? "default" : "ghost"}
            size="sm"
            onClick={toggleLikeFirst}
          >
            <Heart className="w-4 h-4 mr-1" />
            {likesFirst}
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
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary/60 rounded-full" />
          <div>
            <p className="font-semibold text-sm">Mike Johnson</p>
            <p className="text-xs text-muted-foreground">5 hours ago</p>
          </div>
        </div>
        <p className="text-sm mb-3">Beautiful sunset at the beach today 🌅</p>
        <div className="aspect-video bg-gradient-to-br from-accent to-accent/60 rounded-lg mb-3" />
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

  const renderMessages = () => (
    <Card className="p-4 mt-2 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Design Squad</p>
          <p className="text-xs text-muted-foreground">You: Let's ship this today</p>
        </div>
        <span className="text-xs text-muted-foreground">3m</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Product Team</p>
          <p className="text-xs text-muted-foreground">New designs look great!</p>
        </div>
        <span className="text-xs text-muted-foreground">10m</span>
      </div>
    </Card>
  );

  const renderProfile = () => (
    <Card className="p-4 mt-2 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20" />
        <div>
          <p className="text-sm font-semibold">You</p>
          <p className="text-xs text-muted-foreground">@app_builder</p>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div className="text-center flex-1">
          <p className="font-semibold">120</p>
          <p className="text-xs text-muted-foreground">Posts</p>
        </div>
        <div className="text-center flex-1">
          <p className="font-semibold">2.5k</p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div className="text-center flex-1">
          <p className="font-semibold">310</p>
          <p className="text-xs text-muted-foreground">Following</p>
        </div>
      </div>
      <Button variant="outline" className="w-full mt-1">
        Edit Profile
      </Button>
    </Card>
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Social</h1>

      <div className="flex gap-2 rounded-full bg-muted p-1">
        <Button
          size="sm"
          variant={tab === "feed" ? "default" : "ghost"}
          className="flex-1 rounded-full"
          onClick={() => setTab("feed")}
        >
          Feed
        </Button>
        <Button
          size="sm"
          variant={tab === "messages" ? "default" : "ghost"}
          className="flex-1 rounded-full"
          onClick={() => setTab("messages")}
        >
          Messages
        </Button>
        <Button
          size="sm"
          variant={tab === "profile" ? "default" : "ghost"}
          className="flex-1 rounded-full"
          onClick={() => setTab("profile")}
        >
          Profile
        </Button>
      </div>

      {tab === "feed" && renderFeed()}
      {tab === "messages" && renderMessages()}
      {tab === "profile" && renderProfile()}
    </div>
  );
};
