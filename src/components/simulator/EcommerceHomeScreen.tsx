import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const EcommerceHomeScreen = () => {
  const [tab, setTab] = useState<"home" | "cart" | "profile">("home");

  const renderHome = () => (
    <div className="grid grid-cols-2 gap-3 mt-2">
      <Card className="overflow-hidden" role="button" tabIndex={0}>
        <div className="aspect-square bg-gradient-to-br from-primary to-primary/70" />
        <div className="p-3">
          <h3 className="font-semibold text-sm">Premium Headphones</h3>
          <p className="text-lg font-bold text-primary">$299</p>
          <Button size="sm" className="w-full mt-2">
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden" role="button" tabIndex={0}>
        <div className="aspect-square bg-gradient-to-br from-secondary to-secondary/70" />
        <div className="p-3">
          <h3 className="font-semibold text-sm">Smart Watch</h3>
          <p className="text-lg font-bold text-primary">$399</p>
          <Button size="sm" className="w-full mt-2">
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden" role="button" tabIndex={0}>
        <div className="aspect-square bg-gradient-to-br from-accent to-accent/70" />
        <div className="p-3">
          <h3 className="font-semibold text-sm">Laptop Stand</h3>
          <p className="text-lg font-bold text-primary">$79</p>
          <Button size="sm" className="w-full mt-2">
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden" role="button" tabIndex={0}>
        <div className="aspect-square bg-gradient-to-br from-muted to-muted-foreground/20" />
        <div className="p-3">
          <h3 className="font-semibold text-sm">Wireless Mouse</h3>
          <p className="text-lg font-bold text-primary">$49</p>
          <Button size="sm" className="w-full mt-2">
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderCart = () => (
    <Card className="p-4 mt-2 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span>Premium Headphones</span>
        <span className="font-medium">$299</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span>Wireless Mouse</span>
        <span className="font-medium">$49</span>
      </div>
      <div className="border-t border-border pt-3 flex items-center justify-between text-sm">
        <span className="font-semibold">Total</span>
        <span className="text-lg font-bold text-primary">$348</span>
      </div>
      <Button className="w-full mt-1">Checkout</Button>
    </Card>
  );

  const renderProfile = () => (
    <Card className="p-4 mt-2 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20" />
        <div>
          <p className="text-sm font-semibold">Alex Morgan</p>
          <p className="text-xs text-muted-foreground">alex@example.com</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span>Orders</span>
          <span className="font-medium">24</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Loyalty Points</span>
          <span className="font-medium">1,240</span>
        </div>
      </div>
      <Button variant="outline" className="w-full mt-1">
        Manage Account
      </Button>
    </Card>
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Shop</h1>

      <div className="flex gap-2 rounded-full bg-muted p-1">
        <Button
          size="sm"
          variant={tab === "home" ? "default" : "ghost"}
          className="flex-1 rounded-full"
          onClick={() => setTab("home")}
        >
          Home
        </Button>
        <Button
          size="sm"
          variant={tab === "cart" ? "default" : "ghost"}
          className="flex-1 rounded-full"
          onClick={() => setTab("cart")}
        >
          Cart
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

      {tab === "home" && renderHome()}
      {tab === "cart" && renderCart()}
      {tab === "profile" && renderProfile()}
    </div>
  );
};
