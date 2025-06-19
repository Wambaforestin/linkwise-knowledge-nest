
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

type AuthMode = 'signin' | 'signup' | 'forgot-password' | 'verify-otp' | 'new-password';

interface AuthHeaderProps {
  mode: AuthMode;
  onBack?: () => void;
}

export const AuthHeader = ({ mode, onBack }: AuthHeaderProps) => {
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

  const showBackButton = mode === 'forgot-password' || mode === 'verify-otp';

  return (
    <CardHeader className="text-center">
      <div className="flex justify-center mb-4">
        <img 
          src="/linkwise-knowledge-nest/lovable-uploads/80f7fd34-d116-4d5e-8fdc-9992eb6c23ee.png" 
          alt="LinkWise Logo" 
          className="h-16 w-16 object-contain"
        />
      </div>
      <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
        {showBackButton && onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
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
  );
};
