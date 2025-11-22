import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PublishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PublishModal = ({ open, onOpenChange }: PublishModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            Publish Your App
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Deploy your app to Google Play Store and Apple App Store
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="google" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="google">Google Play Store</TabsTrigger>
            <TabsTrigger value="apple">Apple App Store</TabsTrigger>
          </TabsList>

          <TabsContent value="google" className="space-y-4 mt-4">
            <Card className="p-6 border-2 border-border">
              <h3 className="text-xl font-semibold mb-4">Google Play Store Requirements</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Developer Account</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Create a Google Play Console developer account (one-time fee: $25 USD)
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://play.google.com/console/signup" target="_blank" rel="noopener noreferrer">
                      Create Account <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">2. App Signing</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate a signing key and configure app signing in Play Console
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. Build APK/AAB</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Download your APK from AppDev and prepare your app bundle
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
                    <li>Click "Download APK" button</li>
                    <li>Upload to Play Console</li>
                    <li>Complete store listing</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">4. Store Listing</h4>
                  <p className="text-sm text-muted-foreground">
                    Prepare app description, screenshots, icon, and privacy policy
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold mb-1">⏱️ Review Time</p>
                  <p className="text-xs text-muted-foreground">
                    Typically 1-3 days after submission
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="apple" className="space-y-4 mt-4">
            <Card className="p-6 border-2 border-border">
              <h3 className="text-xl font-semibold mb-4">Apple App Store Requirements</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Apple Developer Account</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Enroll in Apple Developer Program ($99 USD/year)
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://developer.apple.com/programs/enroll/" target="_blank" rel="noopener noreferrer">
                      Enroll Now <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">2. Certificates & Provisioning</h4>
                  <p className="text-sm text-muted-foreground">
                    Create certificates and provisioning profiles in Apple Developer Portal
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. Build IPA</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Download your IPA from AppDev and prepare for App Store Connect
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
                    <li>Click "Download IPA" button</li>
                    <li>Upload via Xcode or Transporter</li>
                    <li>Submit for review</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">4. App Store Connect</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete app information, screenshots, pricing, and availability
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold mb-1">⏱️ Review Time</p>
                  <p className="text-xs text-muted-foreground">
                    Typically 1-7 days, stricter review process than Google Play
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">📋 General Requirements</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Privacy Policy URL (required for both stores)</li>
            <li>• App icon in required sizes</li>
            <li>• Screenshots for different device sizes</li>
            <li>• App description and keywords</li>
            <li>• Content rating/age restrictions</li>
          </ul>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90" asChild>
            <a href="https://docs.lovable.dev" target="_blank" rel="noopener noreferrer">
              View Documentation <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
