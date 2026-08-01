import { forwardRef } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Widget = forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, children, ...props }, ref) => (
    <Card
      ref={ref}
      variant="surface"
      className={cn('flex flex-col gap-4 p-6', className)}
      {...props}
    >
      {children}
    </Card>
  ),
);
Widget.displayName = 'Widget';

export const WidgetHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between gap-4 border-b border-border/40 pb-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
WidgetHeader.displayName = 'WidgetHeader';

export const WidgetBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('min-h-0 flex-1', className)} {...props}>
      {children}
    </div>
  ),
);
WidgetBody.displayName = 'WidgetBody';

export const WidgetFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
WidgetFooter.displayName = 'WidgetFooter';

export const WidgetGrid = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
WidgetGrid.displayName = 'WidgetGrid';
