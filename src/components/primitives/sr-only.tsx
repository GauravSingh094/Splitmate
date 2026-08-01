import { cn } from '@/lib/utils';

interface SrOnlyProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * Renders content that is visually hidden but accessible to screen readers.
 * Use this for labels, announcements, and supplementary context.
 *
 * @example
 * <button>
 *   <TrashIcon aria-hidden="true" />
 *   <SrOnly>Delete expense</SrOnly>
 * </button>
 */
export function SrOnly({ children, className, ...props }: SrOnlyProps) {
  return (
    <span className={cn('sr-only', className)} {...props}>
      {children}
    </span>
  );
}
