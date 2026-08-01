import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/design-system/components/icon';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center gap-2', className)}
    >
      <Button
        variant="outline"
        size="sm"
        disabled={!canGoPrevious}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        <Icon icon={ChevronLeft} size={16} />
        <span>Previous</span>
      </Button>

      <span className="px-3 text-xs font-medium text-muted-foreground">
        Page <span className="font-semibold text-foreground">{currentPage}</span> of{' '}
        <span className="font-semibold text-foreground">{totalPages}</span>
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        <span>Next</span>
        <Icon icon={ChevronRight} size={16} />
      </Button>
    </nav>
  );
}
