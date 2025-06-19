
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsOfServiceModal } from './TermsOfServiceModal';
import { OtpInput } from './OtpInput';
import { NewPasswordForm } from './NewPasswordForm';
import { SignInForm } from './auth/SignInForm';
import { SignUpForm } from './auth/SignUpForm';
import { ForgotPasswordForm } from './auth/ForgotPasswordForm';
import { AuthHeader } from './auth/AuthHeader';

type AuthMode = 'signin' | 'signup' | 'forgot-password' | 'verify-otp' | 'new-password';

export const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { toast } = useToast();

  // Check URL parameters for password reset flow
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
      setMode('verify-otp');
    }
  }, []);

  const handleForgotPasswordSuccess = (email: string) => {
    setResetEmail(email);
    setMode('verify-otp');
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

  const renderContent = () => {
    switch (mode) {
      case 'signin':
        return (
          <SignInForm
            onSwitchToSignUp={() => setMode('signup')}
            onSwitchToForgotPassword={() => setMode('forgot-password')}
          />
        );
      
      case 'signup':
        return (
          <SignUpForm
            onSwitchToSignIn={() => setMode('signin')}
            onShowPrivacyModal={() => setShowPrivacyModal(true)}
            onShowTermsModal={() => setShowTermsModal(true)}
          />
        );
      
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSwitchToSignIn={() => setMode('signin')}
            onSuccess={handleForgotPasswordSuccess}
          />
        );
      
      case 'verify-otp':
        return (
          <OtpInput
            email={resetEmail}
            onSuccess={handleOtpSuccess}
            onBack={() => setMode('forgot-password')}
          />
        );
      
      case 'new-password':
        return <NewPasswordForm onSuccess={handlePasswordUpdateSuccess} />;
      
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <AuthHeader 
          mode={mode} 
          onBack={() => setMode('signin')} 
        />
        <CardContent>
          {renderContent()}
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
