import { Navigation } from "@/components/Navigation";
import { PricingModal } from "@/components/PricingModal";
import { PublishModal } from "@/components/PublishModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download, Calendar, Smartphone, History } from "lucide-react";

const BuildHistory = () => {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);

  // Mock build history data - would come from database in production
  const builds = [
    {
      id: 1,
      projectName: "Cricket App",
      type: "APK",
      date: "Nov 22, 2024 - 2:30 PM",
      size: "45.2 MB",
      credits: 5,
      status: "Success"
    },
    {
      id: 2,
      projectName: "Cricket App",
      type: "IPA",
      date: "Nov 22, 2024 - 2:35 PM",
      size: "52.8 MB",
      credits: 5,
      status: "Success"
    },
    {
      id: 3,
      projectName: "E-commerce Store",
      type: "APK",
      date: "Nov 21, 2024 - 5:15 PM",
      size: "38.6 MB",
      credits: 5,
      status: "Success"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onPricingClick={() => setPricingOpen(true)}
        onPublishClick={() => setPublishOpen(true)}
      />
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
      <PublishModal open={publishOpen} onOpenChange={setPublishOpen} />

      <div className="container px-4 mx-auto pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Build History</h1>
          <p className="text-muted-foreground">View and download all your previous builds</p>
        </div>

        <div className="space-y-4">
          {builds.map((build) => (
            <Card key={build.id} className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    build.type === 'APK' ? 'bg-green-500/20' : 'bg-blue-500/20'
                  }`}>
                    <Smartphone className={`w-6 h-6 ${
                      build.type === 'APK' ? 'text-green-600' : 'text-blue-600'
                    }`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{build.projectName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        build.type === 'APK' 
                          ? 'bg-green-500/20 text-green-600' 
                          : 'bg-blue-500/20 text-blue-600'
                      }`}>
                        {build.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        build.status === 'Success' ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'
                      }`}>
                        {build.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {build.date}
                      </span>
                      <span>{build.size}</span>
                      <span className="text-primary font-medium">{build.credits} credits</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {builds.length === 0 && (
          <div className="text-center py-20">
            <History className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No builds yet</h3>
            <p className="text-muted-foreground">Your build history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildHistory;
