import { ChevronRight } from 'lucide-react';
import React from 'react';

import { Icon } from '@/design-system/components/icon';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  onItemClick?: (item: BreadcrumbItem) => void;
}

export function Breadcrumbs({ items, onItemClick, className, ...props }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-sm', className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <Icon icon={ChevronRight} size={14} className="text-muted-foreground/60" />
              )}
              {isLast ? (
                <span
                  className="flex items-center gap-1.5 font-semibold text-foreground"
                  aria-current="page"
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onItemClick?.(item)}
                  className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.icon}
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
