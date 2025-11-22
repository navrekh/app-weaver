import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const EcommerceHomeScreen = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Shop</h1>
      
      <div className="grid grid-cols-2 gap-3">
        <Card className="overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-500" />
          <div className="p-3">
            <h3 className="font-semibold text-sm">Premium Headphones</h3>
            <p className="text-lg font-bold text-primary">$299</p>
            <Button size="sm" className="w-full mt-2">
              <ShoppingCart className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-green-500 to-teal-500" />
          <div className="p-3">
            <h3 className="font-semibold text-sm">Smart Watch</h3>
            <p className="text-lg font-bold text-primary">$399</p>
            <Button size="sm" className="w-full mt-2">
              <ShoppingCart className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-orange-500 to-red-500" />
          <div className="p-3">
            <h3 className="font-semibold text-sm">Laptop Stand</h3>
            <p className="text-lg font-bold text-primary">$79</p>
            <Button size="sm" className="w-full mt-2">
              <ShoppingCart className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-pink-500 to-purple-500" />
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
    </div>
  );
};
