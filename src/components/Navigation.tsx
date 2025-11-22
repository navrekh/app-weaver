import { Button } from "@/components/ui/button";
import { Github, DollarSign, Upload, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import logoIcon from "@/assets/logo-icon.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  onPricingClick: () => void;
  onPublishClick: () => void;
}

export const Navigation = ({ onPricingClick, onPublishClick }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass">
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="AppDev" className="w-9 h-9 object-contain animate-glow-pulse" />
            <span className="text-xl font-bold text-gradient">AppDev</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="ghost" size="sm" onClick={onPricingClick}>
              <DollarSign className="w-4 h-4 mr-2" />
              Pricing
            </Button>
            <Button variant="ghost" size="sm" onClick={onPublishClick}>
              <Upload className="w-4 h-4 mr-2" />
              Publish
            </Button>
            <Button variant="outline" size="sm" className="glass" onClick={() => navigate('/projects')}>
              + New Project
            </Button>

            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      {user.name || user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-sm font-medium text-primary">5 Credits</span>
                </div>
              </>
            ) : (
              <Button size="sm" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-2">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => navigate('/projects')}>
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm" onClick={onPricingClick} className="justify-start">
                <DollarSign className="w-4 h-4 mr-2" />
                Pricing
              </Button>
              <Button variant="ghost" size="sm" onClick={onPublishClick} className="justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Publish
              </Button>
              {user ? (
                <>
                  <div className="text-xs text-muted-foreground px-2 py-1">
                    {user.email}
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="justify-start">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => navigate('/auth')} className="w-full">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
