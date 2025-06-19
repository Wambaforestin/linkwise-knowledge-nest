
import { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface OtpInputProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const OtpInput = ({ email, onSuccess, onBack }: OtpInputProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyOtp } = useAuth();
  const { toast } = useToast();

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await verifyOtp(email, otp, 'recovery');
      if (error) {
        toast({
          title: "Verification Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "OTP verified successfully. You can now set a new password.",
        });
        onSuccess();
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
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Enter the 6-digit verification code sent to {email}
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="otp" className="text-center block">Verification Code</Label>
        <div className="flex justify-center">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <div className="space-y-2">
        <Button 
          onClick={handleVerifyOtp} 
          className="w-full" 
          disabled={loading || otp.length !== 6}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify Code
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="w-full"
          disabled={loading}
        >
          Back to Email
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        The verification code expires in 1 hour. If you don't receive it, check your spam folder.
      </p>
    </div>
  );
};
