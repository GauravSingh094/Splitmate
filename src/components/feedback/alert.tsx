import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { forwardRef } from 'react';

import { Icon } from '@/design-system/components/icon';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-2xl border p-4 shadow-neo-1 flex items-start gap-3.5',
  {
    variants: {
      variant: {
        info: 'bg-info/10 text-foreground border-info/30 [&>svg]:text-info',
        success: 'bg-success/10 text-foreground border-success/30 [&>svg]:text-success',
        warning: 'bg-warning/10 text-foreground border-warning/30 [&>svg]:text-warning',
        danger: 'bg-danger/10 text-foreground border-danger/30 [&>svg]:text-danger',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

const ICON_MAP = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
  icon?: React.ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, icon, children, ...props }, ref) => {
    const IconComponent = ICON_MAP[variant ?? 'info'];

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant, className }))} {...props}>
        <span className="shrink-0 pt-0.5">{icon ?? <Icon icon={IconComponent} size={20} />}</span>
        <div className="flex-1 text-sm">
          {title && <h5 className="mb-1 leading-tight font-semibold tracking-tight">{title}</h5>}
          <div className="leading-relaxed text-muted-foreground">{children}</div>
        </div>
      </div>
    );
  },
);
Alert.displayName = 'Alert';
