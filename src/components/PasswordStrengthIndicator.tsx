
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const requirements = [
    {
      test: password.length >= 8,
      text: 'At least 8 characters',
    },
    {
      test: /[A-Z]/.test(password),
      text: 'Contains uppercase letter',
    },
    {
      test: /[a-z]/.test(password),
      text: 'Contains lowercase letter',
    },
    {
      test: /[0-9]/.test(password),
      text: 'Contains number',
    },
  ];

  const isValid = requirements.every(req => req.test);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      {requirements.map((req, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          {req.test ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <X className="h-3 w-3 text-red-500" />
          )}
          <span className={req.test ? 'text-green-600' : 'text-red-600'}>
            {req.text}
          </span>
        </div>
      ))}
    </div>
  );
};
