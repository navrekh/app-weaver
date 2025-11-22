import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your
            <br />
            <span className="text-gradient glow-text">Next Mobile App?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of builders who are shipping mobile apps faster than ever before.
            Start with 5 free credits—no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)] transition-all group">
              Start Building Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="glass hover:bg-secondary/80">
              Schedule Demo
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground">
            Free forever • No credit card required • 5 credits included
          </p>
        </div>
      </div>
    </section>
  );
};
