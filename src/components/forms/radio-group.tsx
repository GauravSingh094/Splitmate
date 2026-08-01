import { createContext, forwardRef, useContext } from 'react';

import { cn } from '@/lib/utils';

interface RadioContextValue {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RadioContext = createContext<RadioContextValue>({});

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, value, onChange, disabled, className, children, ...props }, ref) => {
    return (
      <RadioContext.Provider value={{ name, value, onChange, disabled }}>
        <div
          ref={ref}
          role="radiogroup"
          className={cn('flex flex-col gap-2.5', className)}
          {...props}
        >
          {children}
        </div>
      </RadioContext.Provider>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  value: string;
  label?: React.ReactNode;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, label, id, disabled, ...props }, ref) => {
    const ctx = useContext(RadioContext);
    const isChecked = ctx.value === value;
    const isDisabled = disabled || ctx.disabled;

    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium text-foreground select-none',
          isDisabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            id={id}
            ref={ref}
            name={ctx.name}
            value={value}
            checked={isChecked}
            onChange={ctx.onChange}
            disabled={isDisabled}
            className={cn(
              'peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-input bg-surface shadow-neo-inset transition-all',
              'checked:border-primary',
              'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
              className,
            )}
            {...props}
          />
          <span className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-primary opacity-0 transition-opacity peer-checked:opacity-100" />
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  },
);
RadioGroupItem.displayName = 'RadioGroupItem';
