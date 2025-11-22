import { Button } from "@/components/ui/button";
import { Smartphone, Download, Send, Home, FolderOpen, History, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered App Builder</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Build Mobile Apps
            <br />
            <span className="text-gradient glow-text">Just by Chatting</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Describe your app in plain English. Watch it come to life instantly with AI-powered generation.
          </p>
        </div>

        {/* Dashboard Interface Demo */}
        <Card className="glass border-border/50 overflow-hidden max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="flex flex-col lg:flex-row h-[600px]">
            {/* Left Sidebar */}
            <div className="w-full lg:w-48 border-b lg:border-b-0 lg:border-r border-border/50 bg-background/50 p-4 flex lg:flex-col gap-2">
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
                <Home className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
                <FolderOpen className="w-4 h-4" />
                <span className="hidden lg:inline">My Projects</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
                <History className="w-4 h-4" />
                <span className="hidden lg:inline">Build History</span>
              </button>
            </div>

            {/* Center - Phone Preview */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 bg-muted/20">
              <div className="flex gap-3 mb-6">
                <Button variant="outline" size="sm" className="glass">
                  <Download className="w-4 h-4 mr-2" />
                  Download APK
                </Button>
                <Button variant="outline" size="sm" className="glass">
                  <Download className="w-4 h-4 mr-2" />
                  Download IPA
                </Button>
              </div>
              
              {/* Phone Mockup */}
              <div className="relative w-[280px] h-[500px] bg-background border-8 border-foreground rounded-[3rem] shadow-2xl overflow-hidden">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground rounded-b-2xl z-10" />
                
                {/* Phone Content */}
                <div className="h-full bg-gradient-to-b from-background to-muted p-6 pt-12">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold">My App</h2>
                    <div className="w-10 h-10 rounded-full bg-primary animate-pulse" />
                  </div>
                  
                  <Card className="p-4 bg-background/80 border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">Welcome Screen</h3>
                        <p className="text-xs text-muted-foreground">Ready to use</p>
                      </div>
                    </div>
                  </Card>
                  
                  <p className="text-center text-sm text-muted-foreground mt-8">
                    Start by describing your app idea
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar - AI Chat */}
            <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border/50 bg-background/50 flex flex-col">
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">AI Assistant</h3>
                </div>
              </div>
              
              <div className="flex-1 p-4 space-y-4 overflow-auto">
                <div className="bg-primary/10 rounded-lg p-3 animate-in fade-in slide-in-from-left-2 duration-500">
                  <p className="text-sm">Welcome to AppDev! Describe your app idea or paste a Figma URL to get started.</p>
                  <p className="text-xs text-muted-foreground mt-1">8:04:52 PM</p>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-3 ml-8 animate-in fade-in slide-in-from-right-2 duration-500 delay-200">
                  <p className="text-sm">cricket app</p>
                  <p className="text-xs text-muted-foreground mt-1 text-right">8:05:03 PM</p>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-3 animate-in fade-in slide-in-from-left-2 duration-500 delay-300">
                  <p className="text-sm">I'm generating your app based on: "cricket app". Creating screens, components, and navigation...</p>
                  <p className="text-xs text-muted-foreground mt-1">8:05:05 PM</p>
                </div>
              </div>
              
              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Describe your app or paste Figma URL..." 
                    className="glass"
                  />
                  <Button size="icon" className="bg-primary hover:bg-primary/90 shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 glass">
                    React Native
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Flutter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Below Demo */}
        <div className="text-center mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)] transition-all">
            Start Building Free
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Free forever • No credit card required • 5 credits included
          </p>
        </div>
      </div>
    </section>
  );
};
