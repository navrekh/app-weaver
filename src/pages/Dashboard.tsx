import { Navigation } from "@/components/Navigation";
import { PricingModal } from "@/components/PricingModal";
import { PublishModal } from "@/components/PublishModal";
import { DeviceFrameSelector } from "@/components/DeviceFrameSelector";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { ExportMenu } from "@/components/ExportMenu";
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
  Plus,
  Code2,
  FileCode,
  Loader2
} from "lucide-react";
import { geminiCodeGenerator } from "@/services/geminiCodeGenerator";
import { useToast } from "@/hooks/use-toast";
import { CricketHomeScreen } from "@/components/simulator/CricketHomeScreen";
import { EcommerceHomeScreen } from "@/components/simulator/EcommerceHomeScreen";
import { SocialFeedScreen } from "@/components/simulator/SocialFeedScreen";
import { DefaultHomeScreen } from "@/components/simulator/DefaultHomeScreen";

const Dashboard = () => {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string; timestamp: string; code?: any }>>([
    {
      role: "assistant",
      content: "Welcome to AppDev! Describe your app idea and I'll generate React Native or Flutter code for you.",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [appType, setAppType] = useState<"default" | "cricket" | "ecommerce" | "social">("default");
  const [framework, setFramework] = useState<'react-native' | 'flutter'>('react-native');
  const [projectName, setProjectName] = useState('MyApp');
  const { toast } = useToast();

  const handleFigmaImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.fig,.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const aiResponse = {
          role: "assistant",
          content: `Processing Figma file: ${file.name}. I'll convert this design into ${framework} code for you!`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
        toast({
          title: 'Figma Import',
          description: `Processing ${file.name}...`,
        });
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
    const prompt = inputMessage;
    setInputMessage("");
    setIsGenerating(true);

    // Generate mock screens based on the prompt
    generateMockScreens(prompt);

    try {
      // Generate code using Gemini
      const generatedCode = await geminiCodeGenerator.generateCode({
        prompt,
        framework,
        projectName,
      });

      const aiResponse = {
        role: "assistant",
        content: `I've generated a ${framework} project for you! Here's the complete code structure:`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        code: generatedCode
      };
      
      setMessages(prev => [...prev, aiResponse]);

      toast({
        title: 'Code Generated',
        description: `Your ${framework} project "${projectName}" is ready!`,
      });
    } catch (error) {
      console.error('Code generation error:', error);
      
      const errorResponse = {
        role: "assistant",
        content: 'Sorry, I encountered an error generating the code. Please try again or rephrase your request.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, errorResponse]);
      
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate code. Please check your API key and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
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
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation 
        onPricingClick={() => setPricingOpen(true)}
        onPublishClick={() => setPublishOpen(true)}
      />
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
      <PublishModal open={publishOpen} onOpenChange={setPublishOpen} />
      
      {/* Main Dashboard Layout */}
      <div className="flex-1 flex overflow-hidden pt-16">
        {/* Left Sidebar */}
        <aside className="w-48 border-r border-border/50 bg-background/50 p-4 flex flex-col gap-2">
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
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-muted/20">
          <div className="flex gap-3 mb-6">
            <QRCodeGenerator 
              projectUrl="https://yourdomain.com/preview/demo-app"
              projectName="Demo App"
            />
            <ExportMenu 
              projectId="demo-project"
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
        </main>

        {/* Right Sidebar - AI Chat */}
        <aside className="w-96 border-l border-border/50 bg-card flex flex-col">
          <div className="p-4 border-b border-border/50 bg-card">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">AI Assistant</h3>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-muted/30 border-2 border-primary/30 rounded-lg m-4" style={{ maxHeight: 'calc(100vh - 400px)' }}>
            {messages.map((message, index) => (
              <div key={index} className="space-y-2">
                <div
                  className={`rounded-lg p-3 ${
                    message.role === 'assistant'
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-secondary border border-border ml-8'
                  }`}
                >
                  <p className={`text-sm ${
                    message.role === 'assistant' ? 'text-foreground' : 'text-secondary-foreground'
                  }`}>
                    {message.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {message.timestamp}
                  </p>
                </div>
                
                {message.code && (
                  <Card className="p-4 space-y-3 bg-card/80 ml-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold text-sm">Generated Files</h4>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {message.code.files?.length || 0} files
                      </span>
                    </div>
                    
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {message.code.files?.map((file: any, idx: number) => (
                        <div key={idx} className="border rounded p-2 bg-muted/50">
                          <div className="flex items-center justify-between mb-2">
                            <code className="text-xs font-mono text-primary">{file.path}</code>
                            <span className="text-xs px-2 py-0.5 bg-primary/10 rounded">{file.language}</span>
                          </div>
                          <pre className="text-xs overflow-x-auto bg-background/50 p-2 rounded max-h-[150px] overflow-y-auto">
                            <code>{file.content}</code>
                          </pre>
                        </div>
                      ))}
                    </div>

                    {message.code.dependencies?.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold mb-1.5">Dependencies:</h5>
                        <div className="flex flex-wrap gap-1">
                          {message.code.dependencies.map((dep: string, idx: number) => (
                            <span key={idx} className="text-xs bg-primary/10 px-2 py-1 rounded">
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {message.code.instructions && (
                      <div className="text-xs text-muted-foreground pt-2 border-t">
                        <p className="whitespace-pre-wrap">{message.code.instructions}</p>
                      </div>
                    )}
                  </Card>
                )}
              </div>
            ))}
            {isGenerating && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm">Generating {framework} code...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Input Section */}
          <div className="p-4 border-t border-border/50 space-y-3 bg-card">
            <Button 
              variant="outline" 
              className="w-full glass justify-center border-primary/30"
              onClick={handleFigmaImport}
            >
              <Download className="w-4 h-4 mr-2" />
              Import Figma Design
            </Button>

            <div className="flex gap-2">
              <Input
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="flex-1 border-primary/30"
              />
            </div>

            <div className="flex gap-2">
              <Input 
                placeholder={`Describe your ${framework} app...`}
                className="bg-background text-foreground border-primary/30"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isGenerating && handleSendMessage()}
                disabled={isGenerating}
              />
              <Button 
                size="icon" 
                className="bg-primary hover:bg-primary/90 shrink-0"
                onClick={handleSendMessage}
                disabled={isGenerating || !inputMessage.trim()}
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Target Framework</p>
              <div className="flex gap-2">
                <Button 
                  variant={framework === 'react-native' ? 'default' : 'outline'}
                  size="sm" 
                  className="flex-1"
                  onClick={() => setFramework('react-native')}
                >
                  React Native
                </Button>
                <Button 
                  variant={framework === 'flutter' ? 'default' : 'outline'}
                  size="sm" 
                  className="flex-1"
                  onClick={() => setFramework('flutter')}
                >
                  Flutter
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
