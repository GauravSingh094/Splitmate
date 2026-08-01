import { forwardRef } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="surface"
        className={cn(
          'flex min-h-[220px] flex-col items-center justify-center p-8 text-center',
          className,
        )}
        {...props}
      >
        {icon && (
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-raised text-muted-foreground shadow-neo-1">
            {icon}
          </div>
        )}
        <h4 className="text-base font-semibold tracking-tight text-foreground">{title}</h4>
        {description && (
          <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {action && <div className="mt-6 flex items-center justify-center">{action}</div>}
      </Card>
    );
  },
);
EmptyState.displayName = 'EmptyState';
