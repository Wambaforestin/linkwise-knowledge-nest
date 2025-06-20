import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsOfServiceModal } from './TermsOfServiceModal';
import { NewPasswordForm } from './NewPasswordForm';
import { SignInForm } from './auth/SignInForm';
import { SignUpForm } from './auth/SignUpForm';
import { ForgotPasswordForm } from './auth/ForgotPasswordForm';
import { AuthHeader } from './auth/AuthHeader';

type AuthMode = 'signin' | 'signup' | 'forgot-password' | 'new-password';

export const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  // Check URL parameters and route for password reset flow
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isRecoverRoute = location.pathname === '/recover';
    const hasResetParam = urlParams.get('reset') === 'true';
    
    if (isRecoverRoute || hasResetParam) {
      setMode('new-password');
      toast({
        title: "Reset Password",
        description: "Please enter your new password below.",
      });
    }
  }, [toast, location.pathname]);

  const handleForgotPasswordSuccess = () => {
    toast({
      title: "Reset Email Sent!",
      description: "Check your email for a password reset link.",
    });
    setMode('signin');
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
