
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsOfServiceModal } from './TermsOfServiceModal';
import { OtpInput } from './OtpInput';
import { NewPasswordForm } from './NewPasswordForm';

type AuthMode = 'signin' | 'signup' | 'forgot-password' | 'verify-otp' | 'new-password';

export const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { signUp, signIn, resetPassword } = useAuth();
  const { toast } = useToast();

  // Check URL parameters for password reset flow
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
      setMode('verify-otp');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
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
      } else if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Sign In Error",
            description: error.message,
            variant: "destructive",
          });
        }
      } else if (mode === 'forgot-password') {
        const { error } = await resetPassword(email);
        if (error) {
          toast({
            title: "Reset Password Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Reset Email Sent!",
            description: "Check your email for a 6-digit verification code. The code will expire in 1 hour.",
          });
          setResetEmail(email);
          setMode('verify-otp');
        }
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

  const handleOtpSuccess = () => {
    setMode('new-password');
  };

  const handlePasswordUpdateSuccess = () => {
    toast({
      title: "Password Updated!",
      description: "You can now sign in with your new password.",
    });
    setMode('signin');
    // Clear the reset parameter from URL
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const getTitle = () => {
    switch (mode) {
      case 'signup': return 'Create Account';
      case 'forgot-password': return 'Reset Password';
      case 'verify-otp': return 'Verify Code';
      case 'new-password': return 'Set New Password';
      default: return 'Welcome Back';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'signup': return 'Sign up to start organizing your links';
      case 'forgot-password': return 'Enter your email to receive a verification code';
      case 'verify-otp': return 'Enter the verification code from your email';
      case 'new-password': return 'Choose a new secure password';
      default: return 'Sign in to access your digital reference library';
    }
  };

  const renderContent = () => {
    if (mode === 'verify-otp') {
      return (
        <OtpInput
          email={resetEmail || email}
          onSuccess={handleOtpSuccess}
          onBack={() => setMode('forgot-password')}
        />
      );
    }

    if (mode === 'new-password') {
      return <NewPasswordForm onSuccess={handlePasswordUpdateSuccess} />;
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
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
        )}
        
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
        
        {mode !== 'forgot-password' && (
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
            {mode === 'signup' && (
              <PasswordStrengthIndicator password={password} />
            )}
          </div>
        )}

        {mode === 'signup' && (
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
                  onClick={() => setShowTermsModal(true)}
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
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-primary underline hover:no-underline"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        )}
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === 'signup' && 'Sign Up'}
          {mode === 'signin' && 'Sign In'}
          {mode === 'forgot-password' && 'Send Verification Code'}
        </Button>
      </form>
    );
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/linkwise-knowledge-nest/lovable-uploads/80f7fd34-d116-4d5e-8fdc-9992eb6c23ee.png" 
              alt="LinkWise Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            {(mode === 'forgot-password' || mode === 'verify-otp') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode('signin')}
                className="p-0 h-auto"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {getTitle()}
          </CardTitle>
          <CardDescription>
            {getDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
          
          {mode !== 'verify-otp' && mode !== 'new-password' && (
            <div className="mt-4 space-y-2 text-center">
              {mode === 'signin' && (
                <>
                  <button
                    type="button"
                    onClick={() => setMode('forgot-password')}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors block w-full"
                  >
                    Forgot your password?
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Don't have an account? Sign up
                  </button>
                </>
              )}
              
              {mode === 'signup' && (
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Already have an account? Sign in
                </button>
              )}

              {mode === 'forgot-password' && (
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Remember your password? Sign in
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <PrivacyPolicyModal 
        open={showPrivacyModal} 
        onOpenChange={setShowPrivacyModal} 
      />
      
      <TermsOfServiceModal 
        open={showTermsModal} 
        onOpenChange={setShowTermsModal} 
      />
    </>
  );
};
