import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PricingModal = ({ open, onOpenChange }: PricingModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            Simple, Transparent Pricing
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Choose the plan that works best for you
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Free Plan */}
          <Card className="p-6 border-2 border-border">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold">5 Credits</span>
              </div>
              <p className="text-muted-foreground">On Sign Up</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">5 free credits to get started</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Build and test your first apps</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Export to React Native or Flutter</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">GitHub repository creation</span>
              </li>
            </ul>

            <Button variant="outline" className="w-full" size="lg">
              Sign Up Free
            </Button>
          </Card>

          {/* Pro Plan */}
          <Card className="p-6 border-2 border-primary bg-primary/5 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold">₹2,000</span>
              </div>
              <p className="text-muted-foreground">100 Credits</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">100 generation credits</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Build 5 complete cross-platform apps</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">AI Generation: 10 credits per app</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">APK Build: 5 credits</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">IPA Build: 5 credits</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Unlimited projects</span>
              </li>
            </ul>

            <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-semibold text-center mb-1">Complete App Cost</p>
              <p className="text-xs text-center text-muted-foreground">
                1 AI prompt (10) + 1 APK (5) + 1 IPA (5) = 20 credits per app
              </p>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
              Buy Credits
            </Button>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          All prices in Indian Rupees (INR) • No subscription required
        </p>
      </DialogContent>
    </Dialog>
  );
};
