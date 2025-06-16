
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AuthForm />
    </div>
  );
};

export default Auth;
