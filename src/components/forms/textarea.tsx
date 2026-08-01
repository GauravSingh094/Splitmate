import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, maxLength, value, ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="relative flex w-full flex-col gap-1">
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={cn(
            'flex min-h-[100px] w-full resize-y rounded-xl border border-input bg-surface px-3.5 py-2.5 text-sm text-foreground shadow-neo-inset transition-colors',
            'placeholder:text-muted-foreground/70',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-danger focus-visible:ring-danger',
            className,
          )}
          {...props}
        />
        {maxLength && (
          <span className="self-end text-xs text-muted-foreground">
            {currentLength} / {maxLength}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
