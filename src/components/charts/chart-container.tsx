'use client';

import React from 'react';
import { ResponsiveContainer } from 'recharts';

import { EmptyState } from '@/components/feedback/empty-state';
import { Skeleton } from '@/components/feedback/skeleton';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  height?: number | string;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  children: React.ReactElement;
}

export function ChartContainer({
  title,
  description,
  action,
  height = 300,
  isLoading = false,
  isEmpty = false,
  emptyTitle = 'No chart data available',
  emptyDescription = 'There is no data to display for the selected period.',
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <Card variant="surface" className={cn('flex flex-col gap-4 p-6', className)} {...props}>
      {(title || description || action) && (
        <div className="flex items-center justify-between gap-4 border-b border-border/40 pb-2">
          <div>
            {title && (
              <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
            )}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}

      <div style={{ height }} className="relative flex w-full items-center justify-center">
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-xl" />
        ) : isEmpty ? (
          <EmptyState
            title={emptyTitle}
            description={emptyDescription}
            className="h-full w-full border-none bg-transparent shadow-none"
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
