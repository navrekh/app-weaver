import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    credits: "5",
    description: "Perfect for trying out AppDev",
    features: [
      "5 free credits on signup",
      "Chat-based app generation",
      "Real-time mobile preview",
      "Export to React Native",
      "GitHub repository creation",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "29",
    credits: "100",
    description: "For serious builders",
    popular: true,
    features: [
      "100 credits per month",
      "Everything in Free, plus:",
      "Export to Flutter",
      "Backend generation",
      "Priority support",
      "Advanced customization",
      "Team collaboration (up to 5)",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    credits: "Unlimited",
    description: "For scaling teams",
    features: [
      "Unlimited credits",
      "Everything in Pro, plus:",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantees",
      "Unlimited team members",
      "On-premise deployment option",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 relative" id="pricing">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="text-gradient">Credit-Based</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, scale as you grow. Every plan includes production-ready exports.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`p-8 glass relative animate-in fade-in slide-in-from-bottom-4 duration-700 ${
                plan.popular
                  ? "border-primary shadow-[0_0_40px_hsl(var(--primary)/0.2)] scale-105"
                  : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  {plan.price !== "Custom" && <span className="text-3xl">$</span>}
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="text-sm text-primary mt-2">{plan.credits} credits</p>
              </div>
              
              <Button
                className={`w-full mb-6 ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
              
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
