import { forwardRef, useState } from 'react';
import { Eye, EyeOff, Search, X } from 'lucide-react';

import { Icon } from '@/design-system/components/icon';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = 'text', error, prefixIcon, suffixIcon, onClear, value, disabled, ...props },
    ref,
  ) => {
    return (
      <div className="relative flex w-full items-center">
        {prefixIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
            {prefixIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          value={value ?? ''}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-xl border border-input bg-surface px-3.5 py-2 text-sm text-foreground shadow-neo-inset transition-colors',
            'placeholder:text-muted-foreground/70',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            prefixIcon && 'pl-10',
            (suffixIcon || onClear) && 'pr-10',
            error && 'border-danger focus-visible:ring-danger',
            className,
          )}
          {...props}
        />
        {onClear && value && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon icon={X} size={16} />
          </button>
        )}
        {suffixIcon && !onClear && (
          <div className="pointer-events-none absolute right-3 flex items-center text-muted-foreground">
            {suffixIcon}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex w-full items-center">
      <Input type={showPassword ? 'text' : 'password'} ref={ref} {...props} />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        <Icon icon={showPassword ? EyeOff : Eye} size={18} />
      </button>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

export const SearchInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <Input
      type="search"
      ref={ref}
      prefixIcon={<Icon icon={Search} size={18} />}
      placeholder="Search..."
      {...props}
    />
  );
});
SearchInput.displayName = 'SearchInput';

export interface CurrencyInputProps extends Omit<InputProps, 'prefixIcon'> {
  currencyCode?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ currencyCode = '$', ...props }, ref) => {
    return (
      <Input
        type="number"
        step="0.01"
        ref={ref}
        prefixIcon={<span className="font-semibold text-foreground">{currencyCode}</span>}
        {...props}
      />
    );
  },
);
CurrencyInput.displayName = 'CurrencyInput';
