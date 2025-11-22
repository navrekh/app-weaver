import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FigmaImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (data: { type: 'file' | 'url'; value: File | string }) => void;
}

export const FigmaImportModal = ({ open, onOpenChange, onImport }: FigmaImportModalProps) => {
  const [figmaUrl, setFigmaUrl] = useState("");
  const { toast } = useToast();

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.fig,.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onImport({ type: 'file', value: file });
        onOpenChange(false);
      }
    };
    input.click();
  };

  const handleUrlImport = () => {
    if (!figmaUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Figma URL",
        variant: "destructive",
      });
      return;
    }

    if (!figmaUrl.includes('figma.com')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Figma URL",
        variant: "destructive",
      });
      return;
    }

    onImport({ type: 'url', value: figmaUrl });
    setFigmaUrl("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import from Figma</DialogTitle>
          <DialogDescription>
            Upload a Figma file or paste a Figma link to import your design
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">Figma Link</TabsTrigger>
            <TabsTrigger value="file">Upload File</TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="https://www.figma.com/file/..."
                value={figmaUrl}
                onChange={(e) => setFigmaUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUrlImport()}
              />
              <p className="text-xs text-muted-foreground">
                Paste your Figma file URL or share link
              </p>
            </div>
            <Button onClick={handleUrlImport} className="w-full">
              <LinkIcon className="w-4 h-4 mr-2" />
              Import from URL
            </Button>
          </TabsContent>

          <TabsContent value="file" className="space-y-4">
            <div className="space-y-2">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">
                  Click to upload Figma file
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports .fig and .json files
                </p>
              </div>
            </div>
            <Button onClick={handleFileUpload} className="w-full" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
