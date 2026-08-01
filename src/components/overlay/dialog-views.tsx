import { forwardRef } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface DialogViewProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

export const DialogView = forwardRef<HTMLDivElement, DialogViewProps>(
  ({ className, title, description, footer, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="surface"
        className={cn('flex flex-col gap-4 p-6', className)}
        {...props}
      >
        {(title || description) && (
          <div className="flex flex-col gap-1 border-b border-border/40 pb-3">
            {title && (
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
            )}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className="flex-1">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-border/40 pt-3">
            {footer}
          </div>
        )}
      </Card>
    );
  },
);
DialogView.displayName = 'DialogView';
