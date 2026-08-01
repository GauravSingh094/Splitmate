import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const spinnerVariants = cva(
  // Base: positioned container
  'relative inline-flex shrink-0 items-center justify-center',
  {
    variants: {
      size: {
        xs: 'h-4 w-4',
        sm: 'h-5 w-5',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-10 w-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const trackVariants = cva('absolute inset-0 animate-spin rounded-full border-2', {
  variants: {
    variant: {
      default: 'border-border border-t-foreground',
      primary: 'border-primary/20 border-t-primary',
      muted: 'border-muted border-t-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface SpinnerProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants>,
    VariantProps<typeof trackVariants> {
  label?: string;
}

/**
 * Accessible loading spinner.
 * Uses `role="status"` and a visually-hidden label for screen readers.
 *
 * @example
 * <Spinner size="lg" variant="primary" label="Loading expenses…" />
 */
export function Spinner({ size, variant, label = 'Loading…', className, ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <span className={trackVariants({ variant })} />
      <span className="sr-only">{label}</span>
    </span>
  );
}
