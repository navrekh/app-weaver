import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";

export const SocialFeedScreen = () => {
  const [tab, setTab] = useState<"feed" | "messages" | "profile">("feed");
  const [likedFirst, setLikedFirst] = useState(false);
  const [likesFirst, setLikesFirst] = useState(24);

  const toggleLikeFirst = () => {
    setLikedFirst((prev) => !prev);
    setLikesFirst((prev) => (likedFirst ? prev - 1 : prev + 1));
  };

  const renderFeed = () => (
    <div className="space-y-4">
      <Card className="overflow-hidden border-border/50 shadow-lg bg-background/80 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              SC
            </div>
            <div>
              <p className="font-bold text-sm">Sarah Chen</p>
              <p className="text-xs text-muted-foreground">2 hours ago • 🌍 Public</p>
            </div>
          </div>
          <p className="text-sm mb-3">Just launched my new app! So excited to share it with you all 🚀✨</p>
        </div>
        <div className="aspect-video bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-4xl">🚀</div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
            <span>{likesFirst} likes</span>
            <span>8 comments</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={likedFirst ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={toggleLikeFirst}
            >
              <Heart className={`w-4 h-4 mr-1 ${likedFirst ? "fill-current" : ""}`} />
              Like
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-1" />
              Comment
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden border-border/50 shadow-lg bg-background/80 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              MJ
            </div>
            <div>
              <p className="font-bold text-sm">Mike Johnson</p>
              <p className="text-xs text-muted-foreground">5 hours ago • 🔒 Friends</p>
            </div>
          </div>
          <p className="text-sm mb-3">Beautiful sunset at the beach today 🌅 Nature is amazing!</p>
        </div>
        <div className="aspect-video bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-4xl">🌅</div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
            <span>156 likes</span>
            <span>23 comments</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Heart className="w-4 h-4 mr-1" />
              Like
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-1" />
              Comment
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-3">
      <Card className="p-4 hover-scale cursor-pointer bg-background/60 backdrop-blur-sm border-border/50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg relative">
            DS
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-bold">Design Squad</p>
              <span className="text-xs text-muted-foreground">3m</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">You: Let&apos;s ship this today 🚀</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover-scale cursor-pointer bg-background/60 backdrop-blur-sm border-border/50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
            PT
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-bold">Product Team</p>
              <span className="text-xs text-muted-foreground">10m</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">New designs look great! 👏</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover-scale cursor-pointer bg-background/60 backdrop-blur-sm border-border/50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg relative">
            EK
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-bold">Emily Kim</p>
              <span className="text-xs text-muted-foreground">1h</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">Thanks for the feedback! 🙏</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <Card className="p-6 space-y-4 bg-background/60 backdrop-blur-xl border-border/50 shadow-xl">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl mb-3">
          YOU
        </div>
        <p className="font-bold text-lg">@app_builder</p>
        <p className="text-xs text-muted-foreground">Building amazing apps ✨</p>
      </div>
      
      <div className="flex justify-center gap-6 py-4">
        <div className="text-center">
          <p className="text-2xl font-bold">120</p>
          <p className="text-xs text-muted-foreground">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">2.5k</p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">310</p>
          <p className="text-xs text-muted-foreground">Following</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="default" className="flex-1">
          Edit Profile
        </Button>
        <Button variant="outline" className="flex-1">
          Share
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-500/10 via-background to-purple-500/10 p-4 space-y-4">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Social</h1>

      <div className="flex gap-2 rounded-full bg-background/60 backdrop-blur-xl border border-border/50 p-1 shadow-lg">
        <Button
          size="sm"
          variant={tab === "feed" ? "default" : "ghost"}
          className="flex-1 rounded-full text-xs"
          onClick={() => setTab("feed")}
        >
          📱 Feed
        </Button>
        <Button
          size="sm"
          variant={tab === "messages" ? "default" : "ghost"}
          className="flex-1 rounded-full text-xs"
          onClick={() => setTab("messages")}
        >
          💬 Messages
        </Button>
        <Button
          size="sm"
          variant={tab === "profile" ? "default" : "ghost"}
          className="flex-1 rounded-full text-xs"
          onClick={() => setTab("profile")}
        >
          👤 Profile
        </Button>
      </div>

      {tab === "feed" && renderFeed()}
      {tab === "messages" && renderMessages()}
      {tab === "profile" && renderProfile()}
    </div>
  );
};
