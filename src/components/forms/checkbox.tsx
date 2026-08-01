import { forwardRef } from 'react';
import { Check } from 'lucide-react';

import { Icon } from '@/design-system/components/icon';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, checked, disabled, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium text-foreground select-none',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            checked={checked}
            disabled={disabled}
            className={cn(
              'peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-input bg-surface shadow-neo-inset transition-all',
              'checked:border-primary checked:bg-primary',
              'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
              className,
            )}
            {...props}
          />
          <span className="pointer-events-none absolute text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100">
            <Icon icon={Check} size={14} />
          </span>
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  },
);
Checkbox.displayName = 'Checkbox';
