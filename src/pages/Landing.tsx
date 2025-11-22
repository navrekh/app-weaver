import { Navigation } from "@/components/Navigation";
import { PricingModal } from "@/components/PricingModal";
import { PublishModal } from "@/components/PublishModal";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onPricingClick={() => setPricingOpen(true)}
        onPublishClick={() => setPublishOpen(true)}
      />
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
      <PublishModal open={publishOpen} onOpenChange={setPublishOpen} />
      
      <Hero onGetStarted={() => navigate('/auth')} />
      <Features />
      <Pricing />
      <CTA />
    </div>
  );
};

export default Landing;
