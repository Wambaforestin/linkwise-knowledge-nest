
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivacyPolicyModal = ({ open, onOpenChange }: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <section>
            <h3 className="font-semibold mb-2">Information We Collect</h3>
            <p>
              We collect information you provide when you create an account, including your email address and any profile information you choose to provide.
            </p>
          </section>
          
          <section>
            <h3 className="font-semibold mb-2">How We Use Your Information</h3>
            <p>
              We use your information to provide and improve our services, communicate with you about your account, and ensure the security of our platform.
            </p>
          </section>
          
          <section>
            <h3 className="font-semibold mb-2">Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>
          
          <section>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our support channels.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
