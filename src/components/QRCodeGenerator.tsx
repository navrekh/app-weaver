import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QrCode, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRCodeGeneratorProps {
  projectUrl: string;
  projectName: string;
}

export const QRCodeGenerator = ({ projectUrl, projectName }: QRCodeGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateQRCode = async () => {
    setIsGenerating(true);
    
    try {
      // Using QR Server API (free, no API key needed)
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(projectUrl)}`;
      setQrCodeUrl(qrApiUrl);
      
      toast({
        title: "QR Code Generated",
        description: "Scan with your phone to test the app instantly",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${projectName}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: projectName,
          text: `Test ${projectName} on your phone`,
          url: projectUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(projectUrl);
      toast({
        title: "Link Copied",
        description: "App URL copied to clipboard",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={generateQRCode}
        >
          <QrCode className="w-4 h-4" />
          Test on Phone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Test on Your Phone</DialogTitle>
          <DialogDescription>
            Scan this QR code with your phone camera to instantly test your app
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-4 py-4">
          {isGenerating ? (
            <div className="w-[300px] h-[300px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Generating QR Code...</p>
            </div>
          ) : qrCodeUrl ? (
            <Card className="p-4 bg-white">
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="w-[300px] h-[300px]"
              />
            </Card>
          ) : (
            <div className="w-[300px] h-[300px] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Click to generate QR code</p>
            </div>
          )}
          
          <div className="text-center">
            <p className="text-sm font-medium mb-1">{projectName}</p>
            <p className="text-xs text-muted-foreground break-all px-4">{projectUrl}</p>
          </div>
          
          {qrCodeUrl && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={downloadQRCode}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={shareQRCode}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          )}
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">📱 How to test:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open Camera app on your phone</li>
            <li>Point at the QR code</li>
            <li>Tap the notification to open</li>
            <li>Test your app live!</li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
};
