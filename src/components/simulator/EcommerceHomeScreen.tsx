import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

export const EcommerceHomeScreen = () => {
  const [tab, setTab] = useState<"home" | "cart" | "profile">("home");
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addItem = (price: number) => {
    setCartCount((c) => c + 1);
    setTotal((t) => t + price);
  };

  const renderHome = () => (
    <div className="space-y-4">
      <div className="relative h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-4 flex flex-col justify-end overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')] opacity-20" />
        <h2 className="text-white text-lg font-bold relative z-10">Summer Sale</h2>
        <p className="text-white/90 text-xs relative z-10">Up to 50% off on selected items</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="overflow-hidden hover-scale border-border/50 shadow-lg bg-background/80 backdrop-blur-sm">
          <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-yellow-900" />
              4.8
            </div>
          </div>
          <div className="p-3 space-y-1">
            <h3 className="font-bold text-sm">Premium Headphones</h3>
            <p className="text-xs text-muted-foreground">Noise Cancelling</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">$299</p>
              <Button
                size="sm"
                className="h-7 px-2"
                onClick={() => addItem(299)}
              >
                <ShoppingCart className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden hover-scale border-border/50 shadow-lg bg-background/80 backdrop-blur-sm">
          <div className="aspect-square bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-yellow-900" />
              4.9
            </div>
          </div>
          <div className="p-3 space-y-1">
            <h3 className="font-bold text-sm">Smart Watch</h3>
            <p className="text-xs text-muted-foreground">Fitness Tracker</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">$399</p>
              <Button
                size="sm"
                className="h-7 px-2"
                onClick={() => addItem(399)}
              >
                <ShoppingCart className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden hover-scale border-border/50 shadow-lg bg-background/80 backdrop-blur-sm">
          <div className="aspect-square bg-gradient-to-br from-orange-500 to-red-500 relative overflow-hidden">
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              SALE
            </div>
          </div>
          <div className="p-3 space-y-1">
            <h3 className="font-bold text-sm">Laptop Stand</h3>
            <p className="text-xs text-muted-foreground">Aluminum</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">$79</p>
              <Button
                size="sm"
                className="h-7 px-2"
                onClick={() => addItem(79)}
              >
                <ShoppingCart className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden hover-scale border-border/50 shadow-lg bg-background/80 backdrop-blur-sm">
          <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-yellow-900" />
              5.0
            </div>
          </div>
          <div className="p-3 space-y-1">
            <h3 className="font-bold text-sm">Wireless Mouse</h3>
            <p className="text-xs text-muted-foreground">Ergonomic</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$49</p>
              <Button
                size="sm"
                className="h-7 px-2"
                onClick={() => addItem(49)}
              >
                <ShoppingCart className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderCart = () => (
    <Card className="p-4 space-y-3 bg-background/60 backdrop-blur-xl border-border/50 shadow-xl">
      {cartCount === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <ShoppingCart className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Items in cart</span>
            <span className="font-semibold">{cartCount}</span>
          </div>
          <div className="border-t border-border/50 pt-3 flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${total}</span>
          </div>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
            Checkout Now
          </Button>
        </>
      )}
    </Card>
  );

  const renderProfile = () => (
    <Card className="p-4 space-y-4 bg-background/60 backdrop-blur-xl border-border/50 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
          AM
        </div>
        <div>
          <p className="font-bold">Alex Morgan</p>
          <p className="text-xs text-muted-foreground">alex@example.com</p>
          <p className="text-xs text-primary mt-1">⭐ Gold Member</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold">24</p>
          <p className="text-xs text-muted-foreground">Orders</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold">1.2k</p>
          <p className="text-xs text-muted-foreground">Points</p>
        </div>
      </div>
      <Button variant="outline" className="w-full">
        Edit Profile
      </Button>
    </Card>
  );

  return (
    <div className="min-h-full bg-gradient-to-br from-purple-500/10 via-background to-pink-500/10 p-4 space-y-4">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Shop</h1>

      <div className="flex gap-2 rounded-full bg-background/60 backdrop-blur-xl border border-border/50 p-1 shadow-lg">
        <Button
          size="sm"
          variant={tab === "home" ? "default" : "ghost"}
          className="flex-1 rounded-full text-xs"
          onClick={() => setTab("home")}
        >
          🏠 Home
        </Button>
        <Button
          size="sm"
          variant={tab === "cart" ? "default" : "ghost"}
          className="flex-1 rounded-full text-xs"
          onClick={() => setTab("cart")}
        >
          🛒 Cart{cartCount > 0 ? ` (${cartCount})` : ""}
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

      {tab === "home" && renderHome()}
      {tab === "cart" && renderCart()}
      {tab === "profile" && renderProfile()}
    </div>
  );
};
