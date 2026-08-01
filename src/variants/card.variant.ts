import { cva } from 'class-variance-authority';

export const cardCvaVariants = cva(
  'rounded-2xl border transition-all duration-200 text-card-foreground',
  {
    variants: {
      variant: {
        surface: 'bg-surface border-border shadow-neo-1',
        raised: 'bg-surface-raised border-border shadow-neo-2',
        inset: 'bg-surface-inset border-border-muted shadow-neo-inset',
        interactive: 'bg-surface border-border shadow-neo-1 hover:shadow-neo-2 cursor-pointer',
        outlined: 'bg-surface border-border shadow-none',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'surface',
      padding: 'md',
    },
  },
);
