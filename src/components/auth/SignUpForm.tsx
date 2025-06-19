
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
  onShowPrivacyModal: () => void;
  onShowTermsModal: () => void;
}

export const SignUpForm = ({ onSwitchToSignIn, onShowPrivacyModal, onShowTermsModal }: SignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate password requirements
      if (password.length < 8) {
        toast({
          title: "Password too short",
          description: "Password must be at least 8 characters long.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Validate terms acceptance
      if (!acceptTerms || !acceptPrivacy) {
        toast({
          title: "Terms Required",
          description: "Please accept both the Terms of Service and Privacy Policy to continue.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account. The confirmation link will expire in 1 hour.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordStrengthIndicator password={password} />
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <div className="text-sm">
              I agree to the{' '}
              <button
                type="button"
                onClick={onShowTermsModal}
                className="text-primary underline hover:no-underline"
              >
                Terms of Service
              </button>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy"
              checked={acceptPrivacy}
              onCheckedChange={(checked) => setAcceptPrivacy(checked as boolean)}
            />
            <div className="text-sm">
              I agree to the{' '}
              <button
                type="button"
                onClick={onShowPrivacyModal}
                className="text-primary underline hover:no-underline"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
      </form>
      
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Already have an account? Sign in
        </button>
      </div>
    </>
  );
};
