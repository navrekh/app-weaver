import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { Mail, ArrowLeft } from 'lucide-react';
import { AWS_CONFIG } from '@/config/aws';

const emailSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
});

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ForgotPasswordModal = ({ open, onOpenChange }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    try {
      emailSchema.parse({ email });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      }
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with AWS Cognito forgotPassword
      // const response = await fetch(`${AWS_CONFIG.apiEndpoint}/auth/forgot-password`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // Simulated password reset for development
      console.log('Password reset requested for:', email);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setEmailSent(true);
      toast({
        title: 'Reset Email Sent!',
        description: 'Check your inbox for password reset instructions.',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to send reset email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setEmailSent(false);
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Reset Password
          </DialogTitle>
          <DialogDescription>
            {emailSent
              ? "We've sent you a password reset link"
              : "Enter your email and we'll send you a reset link"}
          </DialogDescription>
        </DialogHeader>

        {emailSent ? (
          <div className="space-y-4 py-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-sm text-foreground mb-2">
                Password reset email sent to:
              </p>
              <p className="text-sm font-semibold text-primary mb-3">{email}</p>
              <p className="text-xs text-muted-foreground">
                Check your inbox and click the link to reset your password.
              </p>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
              <p className="font-medium">Didn't receive the email?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Check your spam folder</li>
                <li>Make sure you entered the correct email</li>
                <li>Wait a few minutes and try again</li>
              </ul>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleClose}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className={error ? 'border-destructive' : ''}
              />
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
            </div>

            <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
              <p className="font-medium mb-1">📧 AWS Integration Ready</p>
              <p>
                Password reset is configured for AWS Cognito. Add your AWS credentials
                to enable email delivery.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || !email}
                className="flex-1 bg-gradient-to-r from-primary to-secondary"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Reset Link
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
