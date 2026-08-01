'use client';

import { Card } from '@/components/ui/card';
import { Sparkline } from './sparkline';
import { cn } from '@/lib/utils';

export interface KPICardChartProps {
  title: string;
  value: string | number;
  change?: string;
  sparklineData?: Record<string, unknown>[];
  sparklineKey?: string;
  className?: string;
}

export function KPICardChart({
  title,
  value,
  change,
  sparklineData,
  sparklineKey = 'value',
  className,
}: KPICardChartProps) {
  return (
    <Card variant="surface" className={cn('flex flex-col gap-3 p-5', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {title}
        </span>
        {change && <span className="text-xs font-semibold text-success">{change}</span>}
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
        {sparklineData && (
          <div className="h-10 w-24">
            <Sparkline data={sparklineData} dataKey={sparklineKey} />
          </div>
        )}
      </div>
    </Card>
  );
}
