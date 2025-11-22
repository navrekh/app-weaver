import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Download, Github, FileArchive, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportMenuProps {
  projectId: string;
  projectName: string;
}

export const ExportMenu = ({ projectId, projectName }: ExportMenuProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: string) => {
    setIsExporting(true);
    
    try {
      // This will call your AWS Lambda function
      toast({
        title: "Export Started",
        description: `Preparing ${format} export. This may take a moment...`,
      });

      // TODO: Replace with your AWS API Gateway endpoint
      // const response = await fetch(`${AWS_CONFIG.apiEndpoint}/projects/${projectId}/export`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ format })
      // });
      
      // Simulate export for now
      setTimeout(() => {
        toast({
          title: "Export Ready",
          description: `Your ${format} export is ready for download`,
        });
        setIsExporting(false);
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export project",
        variant: "destructive",
      });
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => handleExport("source-code")}>
          <FileArchive className="w-4 h-4 mr-2" />
          <div className="flex flex-col">
            <span className="font-medium">Source Code (ZIP)</span>
            <span className="text-xs text-muted-foreground">Complete React project</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleExport("github")}>
          <Github className="w-4 h-4 mr-2" />
          <div className="flex flex-col">
            <span className="font-medium">Push to GitHub</span>
            <span className="text-xs text-muted-foreground">Create repository</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleExport("android-apk")}>
          <Smartphone className="w-4 h-4 mr-2" />
          <div className="flex flex-col">
            <span className="font-medium">Android APK</span>
            <span className="text-xs text-muted-foreground">Ready to install</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleExport("ios-ipa")}>
          <Smartphone className="w-4 h-4 mr-2" />
          <div className="flex flex-col">
            <span className="font-medium">iOS IPA</span>
            <span className="text-xs text-muted-foreground">Requires signing</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
