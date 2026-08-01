import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, disabled, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-foreground select-none',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <div className="relative inline-flex items-center">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            checked={checked}
            disabled={disabled}
            className={cn(
              'peer h-6 w-11 cursor-pointer appearance-none rounded-full border border-input bg-surface-inset shadow-neo-inset transition-all',
              'checked:border-primary checked:bg-primary',
              'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
              className,
            )}
            {...props}
          />
          <span className="pointer-events-none absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-neo-1 transition-transform peer-checked:translate-x-5" />
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  },
);
Switch.displayName = 'Switch';
