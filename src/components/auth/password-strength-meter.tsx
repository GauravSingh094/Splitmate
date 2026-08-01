'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useMemo } from 'react';

import { Icon } from '@/design-system/components/icon';
import { cn } from '@/lib/utils';

export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordStrengthMeterProps {
  password?: string;
  className?: string;
}

export function PasswordStrengthMeter({ password = '', className }: PasswordStrengthMeterProps) {
  const requirements: PasswordRequirement[] = useMemo(() => {
    return [
      { id: 'length', label: 'At least 8 characters', met: password.length >= 8 },
      {
        id: 'uppercase',
        label: 'At least one uppercase letter (A-Z)',
        met: /[A-Z]/.test(password),
      },
      {
        id: 'lowercase',
        label: 'At least one lowercase letter (a-z)',
        met: /[a-z]/.test(password),
      },
      { id: 'number', label: 'At least one number (0-9)', met: /[0-9]/.test(password) },
      {
        id: 'special',
        label: 'At least one special character (!@#$%^&*)',
        met: /[^A-Za-z0-9]/.test(password),
      },
    ];
  }, [password]);

  const metCount = requirements.filter((r) => r.met).length;

  const { score, label, colorClass } = useMemo(() => {
    if (!password) return { score: 0, label: 'Empty', colorClass: 'bg-muted' };
    if (metCount <= 2) return { score: 25, label: 'Weak', colorClass: 'bg-danger' };
    if (metCount <= 3) return { score: 55, label: 'Medium', colorClass: 'bg-warning' };
    if (metCount <= 4) return { score: 80, label: 'Strong', colorClass: 'bg-info' };
    return { score: 100, label: 'Very Strong', colorClass: 'bg-success' };
  }, [password, metCount]);

  if (!password) return null;

  return (
    <div className={cn('space-y-3 pt-2', className)}>
      {/* Strength Progress Bar */}
      <div className="space-y-1">
        <div className="text-2xs flex items-center justify-between font-semibold">
          <span className="tracking-wider text-muted-foreground uppercase">Password Strength</span>
          <span className={cn('font-bold', colorClass.replace('bg-', 'text-'))}>{label}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full border border-border/40 bg-surface-inset">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn('h-full rounded-full transition-colors', colorClass)}
          />
        </div>
      </div>

      {/* Requirement Checklist */}
      <div className="grid grid-cols-1 gap-1.5 pt-1 sm:grid-cols-2">
        {requirements.map((req) => (
          <div key={req.id} className="text-2xs flex items-center gap-2 font-medium">
            <div
              className={cn(
                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors',
                req.met ? 'bg-success/15 text-success' : 'bg-muted/40 text-muted-foreground/60',
              )}
            >
              <Icon icon={req.met ? Check : X} size={14} />
            </div>
            <span
              className={cn(req.met ? 'font-semibold text-foreground' : 'text-muted-foreground')}
            >
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
