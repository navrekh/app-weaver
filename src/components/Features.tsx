import { MessageSquare, Smartphone, Code2, Github, Zap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: MessageSquare,
    title: "Chat-Based Generation",
    description: "Describe your app in plain English. No coding required—just conversation.",
  },
  {
    icon: Smartphone,
    title: "Real-Time Mobile Preview",
    description: "Watch your app come to life instantly with live mobile UI updates.",
  },
  {
    icon: Code2,
    title: "Production-Ready Code",
    description: "Export React Native or Flutter code that's clean, scalable, and deployment-ready.",
  },
  {
    icon: Github,
    title: "Automatic GitHub Repos",
    description: "Every project gets its own GitHub repository with proper structure and versioning.",
  },
  {
    icon: Zap,
    title: "Backend Scaffolding",
    description: "Generate Node.js backend with APIs, routes, and database connections included.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share projects, collaborate in real-time, and manage permissions seamlessly.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="features">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="text-gradient"> Build Faster</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features that transform how you build mobile applications
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="glass p-6 hover:bg-card/60 transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] group animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
