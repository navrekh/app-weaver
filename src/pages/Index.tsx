import { Navigation } from "@/components/Navigation";
import { PricingModal } from "@/components/PricingModal";
import { PublishModal } from "@/components/PublishModal";
import { DeviceFrameSelector } from "@/components/DeviceFrameSelector";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Download, 
  Send, 
  Home, 
  FolderOpen, 
  History,
  Github,
  DollarSign,
  Plus
} from "lucide-react";
import { CricketHomeScreen } from "@/components/simulator/CricketHomeScreen";
import { EcommerceHomeScreen } from "@/components/simulator/EcommerceHomeScreen";
import { SocialFeedScreen } from "@/components/simulator/SocialFeedScreen";
import { DefaultHomeScreen } from "@/components/simulator/DefaultHomeScreen";

const Index = () => {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome to AppDev! Describe your app idea or paste a Figma URL to get started.",
      timestamp: "6:22 PM"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [appType, setAppType] = useState<"default" | "cricket" | "ecommerce" | "social">("default");

  const handleFigmaImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.fig,.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const aiResponse = {
          role: "assistant",
          content: `Processing Figma file: ${file.name}. I'll convert this design into a React Native app for you!`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }
    };
    input.click();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isGenerating) return;

    const userMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: `I'm generating your app based on: "${inputMessage}". Creating screens, components, and navigation...`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);

      // Generate mock screens based on the prompt
      generateMockScreens(inputMessage);
      
      setIsGenerating(false);
    }, 1500);
  };

  const generateMockScreens = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('cricket') || lowerPrompt.includes('sports')) {
      setAppType("cricket");
    } else if (lowerPrompt.includes('ecommerce') || lowerPrompt.includes('shop')) {
      setAppType("ecommerce");
    } else if (lowerPrompt.includes('social') || lowerPrompt.includes('chat')) {
      setAppType("social");
    } else {
      setAppType("default");
    }
  };

  const renderAppScreen = () => {
    switch (appType) {
      case "cricket":
        return <CricketHomeScreen />;
      case "ecommerce":
        return <EcommerceHomeScreen />;
      case "social":
        return <SocialFeedScreen />;
      default:
        return <DefaultHomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] float-animation" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] float-animation" style={{ animationDelay: '2s' }} />
      </div>

      <Navigation 
        onPricingClick={() => setPricingOpen(true)}
        onPublishClick={() => setPublishOpen(true)}
      />
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
      <PublishModal open={publishOpen} onOpenChange={setPublishOpen} />
      
      {/* Main Dashboard Layout */}
      <div className="flex-1 flex overflow-hidden pt-16 relative z-10">
        {/* Left Sidebar */}
        <aside className="w-48 border-r border-border/50 bg-background/50 backdrop-blur-sm p-4 flex flex-col gap-2 animate-slide-in-left">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-accent text-accent-foreground transition-colors text-sm font-medium">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link to="/projects" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
            <FolderOpen className="w-4 h-4" />
            <span>My Projects</span>
          </Link>
          <Link to="/build-history" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
            <History className="w-4 h-4" />
            <span>Build History</span>
          </Link>
        </aside>

        {/* Center - Phone Preview */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 relative animate-fade-in">
          <div className="flex gap-3 mb-6 animate-scale-in">
            <QRCodeGenerator 
              projectUrl="https://yourdomain.com/preview/demo-app"
              projectName="Demo App"
            />
          </div>
          
          {/* Device Frame with Selector */}
          <DeviceFrameSelector>
            <div key={appType} className="h-full animate-fade-in">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-background to-muted p-6">
                  <div className="w-16 h-16 rounded-full bg-primary animate-pulse mb-4" />
                  <p className="text-center text-sm text-primary animate-pulse">
                    Generating your app...
                  </p>
                </div>
              ) : (
                renderAppScreen()
              )}
            </div>
          </DeviceFrameSelector>
          
          {/* Download Buttons - Below Mobile Screen */}
          <div className="flex gap-3 mt-6 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
            <Button 
              variant="default" 
              className="gap-2 pulse-glow hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4" />
              Download APK
            </Button>
            <Button 
              variant="default" 
              className="gap-2 pulse-glow hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4" />
              Download IPA
            </Button>
          </div>
        </main>

        {/* Right Sidebar - AI Chat */}
        <aside className="w-[700px] border-l border-border/50 bg-card/50 backdrop-blur-sm flex flex-col animate-slide-in-right">
          <div className="p-4 border-b border-border/50 bg-card">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">AI Assistant</h3>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`py-8 px-6 border-b border-border/30 ${
                  message.role === 'assistant'
                    ? 'bg-muted/20'
                    : 'bg-background'
                }`}
              >
                <div className="max-w-3xl mx-auto">
                  <div className="flex gap-4 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'assistant'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {message.role === 'assistant' ? (
                        <Smartphone className="w-5 h-5" />
                      ) : (
                        <span className="text-base font-semibold">U</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="text-base font-semibold text-foreground">
                        {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                      </p>
                      <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="py-8 px-6 bg-muted/20 border-b border-border/30">
                <div className="max-w-3xl mx-auto">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary/20 text-primary">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-semibold text-foreground mb-3">AI Assistant</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-border/50 space-y-3 bg-card">
            <Button 
              variant="outline" 
              className="w-full glass justify-center border-primary/30"
              onClick={handleFigmaImport}
            >
              <Download className="w-4 h-4 mr-2" />
              Import Figma Design
            </Button>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Target Framework</p>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                  React Native
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Flutter
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Input 
                placeholder="Describe your app or paste Figma URL..." 
                className="bg-background text-foreground border-primary/30"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isGenerating}
              />
              <Button 
                size="icon" 
                className="bg-primary hover:bg-primary/90 shrink-0"
                onClick={handleSendMessage}
                disabled={isGenerating || !inputMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;
