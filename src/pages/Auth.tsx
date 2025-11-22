import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { Smartphone, Eye, EyeOff } from 'lucide-react';

const signUpSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password too long'),
});

const signInSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (user) {
    navigate('/', { replace: true });
    return null;
  }

  const validateForm = () => {
    try {
      if (mode === 'signup') {
        signUpSchema.parse(formData);
      } else {
        signInSchema.parse(formData);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0].toString()] = issue.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        
        if (error) {
          if (error.message.includes('already exists') || error.message.includes('duplicate')) {
            toast({
              title: 'Account Already Exists',
              description: 'An account with this email already exists. Please sign in instead.',
              variant: 'destructive',
            });
            setMode('signin');
          } else {
            toast({
              title: 'Sign Up Failed',
              description: error.message || 'Unable to create account. Please try again.',
              variant: 'destructive',
            });
          }
          return;
        }

        toast({
          title: 'Account Created!',
          description: 'Welcome to AppDev. Your account has been created successfully.',
        });
        navigate('/', { replace: true });
      } else {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          if (error.message.includes('No account found')) {
            toast({
              title: 'Account Not Found',
              description: 'No account exists with this email. Please sign up first.',
              variant: 'destructive',
            });
            setMode('signup');
          } else {
            toast({
              title: 'Sign In Failed',
              description: error.message || 'Invalid email or password. Please try again.',
              variant: 'destructive',
            });
          }
          return;
        }

        toast({
          title: 'Welcome Back!',
          description: 'You have successfully signed in.',
        });
        navigate('/', { replace: true });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-background/80 backdrop-blur-sm border-border/50 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AppDev
          </h1>
          <p className="text-muted-foreground">
            {mode === 'signin' ? 'Welcome back! Sign in to continue' : 'Create your account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={loading}
                className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
            {mode === 'signup' && (
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
              </span>
            ) : (
              mode === 'signin' ? 'Sign In' : 'Sign Up'
            )}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <Button
            variant="link"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setErrors({});
            }}
            disabled={loading}
            className="text-primary hover:text-primary/80"
          >
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">🔒 AWS Integration Ready</p>
          <p>
            Authentication is ready for AWS Cognito. Configure your AWS credentials in the deployment guide.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
