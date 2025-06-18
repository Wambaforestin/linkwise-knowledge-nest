
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TermsOfServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsOfServiceModal = ({ open, onOpenChange }: TermsOfServiceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <section>
            <h3 className="font-semibold mb-2">Acceptance of Terms</h3>
            <p>
              By accessing and using LinkWise, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>
          
          <section>
            <h3 className="font-semibold mb-2">Use License</h3>
            <p>
              Permission is granted to temporarily use LinkWise for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </section>
          
          <section>
            <h3 className="font-semibold mb-2">User Account</h3>
            <p>
              You are responsible for safeguarding the password and for maintaining the confidentiality of your account. You agree not to disclose your password to any third party.
            </p>
          </section>
          
          <section>
            <h3 className="font-semibold mb-2">Prohibited Uses</h3>
            <p>
              You may not use our service for any illegal or unauthorized purpose nor may you, in the use of the service, violate any laws in your jurisdiction.
            </p>
          </section>
          
          <section>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p>
              If you have any questions about these Terms of Service, please contact us through our support channels.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
