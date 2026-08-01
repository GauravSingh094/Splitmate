import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', label, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn('h-full w-px shrink-0 bg-border/60', className)}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn('my-4 flex w-full items-center gap-3', className)}
          {...props}
        >
          <div className="h-px flex-1 bg-border/60" />
          <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {label}
          </span>
          <div className="h-px flex-1 bg-border/60" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn('my-4 h-px w-full shrink-0 bg-border/60', className)}
        {...props}
      />
    );
  },
);
Divider.displayName = 'Divider';
