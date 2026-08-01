import { forwardRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';
import { cn } from '@/lib/utils';

export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
}

export const StatBlock = forwardRef<HTMLDivElement, StatBlockProps>(
  ({ className, title, value, change, changeType = 'neutral', icon, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="surface"
        className={cn('flex flex-col gap-2 p-6', className)}
        {...props}
      >
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-xs font-medium tracking-wider uppercase">{title}</span>
          {icon && (
            <span className="rounded-xl border border-border bg-surface-raised p-2 text-foreground shadow-neo-1">
              {icon}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-baseline justify-between gap-2">
          <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
          {change && (
            <div
              className={cn(
                'flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold',
                changeType === 'positive' && 'border-success/20 bg-success/10 text-success',
                changeType === 'negative' && 'border-danger/20 bg-danger/10 text-danger',
                changeType === 'neutral' && 'border-border bg-muted text-muted-foreground',
              )}
            >
              {changeType === 'positive' && <Icon icon={ArrowUpRight} size={14} />}
              {changeType === 'negative' && <Icon icon={ArrowDownRight} size={14} />}
              <span>{change}</span>
            </div>
          )}
        </div>
      </Card>
    );
  },
);
StatBlock.displayName = 'StatBlock';
