import React from 'react';

import { cn } from '@/lib/utils';

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  user?: { name: string; avatar?: string };
}

export interface ActivityListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityItem[];
}

export function formatISTDate(isoString: string): string {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return (
      new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date) + ' IST'
    );
  } catch {
    return isoString;
  }
}

export function ActivityList({ items, className, ...props }: ActivityListProps) {
  return (
    <div className={cn('flex w-full flex-col gap-4', className)} {...props}>
      {items.map((item, index) => (
        <div key={item.id} className="relative flex gap-3 pb-4 last:pb-0">
          {index < items.length - 1 && (
            <span className="absolute top-8 -bottom-4 left-4 w-px bg-border/60" />
          )}
          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-raised text-foreground shadow-neo-1">
            {item.icon ?? <span className="h-2 w-2 rounded-full bg-primary" />}
          </div>
          <div className="flex flex-1 flex-col gap-0.5 pt-1 text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground">{item.title}</span>
              <span className="text-xs text-muted-foreground">{formatISTDate(item.timestamp)}</span>
            </div>
            {item.description && (
              <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
