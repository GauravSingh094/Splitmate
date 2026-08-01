import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors border select-none shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary text-secondary-foreground border-border',
        outline: 'bg-transparent text-foreground border-border',
        success: 'bg-success/15 text-success border-success/30',
        warning: 'bg-warning/15 text-warning-foreground border-warning/30',
        danger: 'bg-danger/15 text-danger border-danger/30',
        info: 'bg-info/15 text-info border-info/30',
        muted: 'bg-muted text-muted-foreground border-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded-md',
        md: 'px-2.5 py-1 text-xs rounded-lg',
        lg: 'px-3 py-1.5 text-sm rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props}>
        {icon && <span className="inline-flex shrink-0 items-center">{icon}</span>}
        {children}
      </span>
    );
  },
);
Badge.displayName = 'Badge';
