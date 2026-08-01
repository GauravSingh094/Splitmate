import { cva } from 'class-variance-authority';

export const buttonCvaVariants = cva(
  [
    'inline-flex items-center justify-center font-medium transition-all duration-200 shrink-0 select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-neo-1 hover:shadow-neo-2 hover:bg-primary/90 active:shadow-neo-inset active:translate-y-[1px]',
        secondary:
          'bg-secondary text-secondary-foreground shadow-neo-1 hover:shadow-neo-2 hover:bg-secondary/80 active:shadow-neo-inset active:translate-y-[1px]',
        ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
        outline:
          'border border-border bg-surface text-foreground shadow-neo-1 hover:bg-accent hover:shadow-neo-2 active:shadow-neo-inset active:translate-y-[1px]',
        danger:
          'bg-danger text-danger-foreground shadow-neo-1 hover:bg-danger/90 hover:shadow-neo-2 active:shadow-neo-inset active:translate-y-[1px]',
        success:
          'bg-success text-success-foreground shadow-neo-1 hover:bg-success/90 hover:shadow-neo-2 active:shadow-neo-inset active:translate-y-[1px]',
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto shadow-none',
        soft: 'bg-accent/60 text-accent-foreground hover:bg-accent active:bg-accent/80',
        minimal: 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs rounded-md gap-1.5',
        sm: 'h-8 px-3 text-xs rounded-lg gap-2',
        md: 'h-10 px-4 text-sm rounded-xl gap-2',
        lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
        xl: 'h-14 px-8 text-lg rounded-2xl gap-3',
        icon: 'h-10 w-10 p-0 rounded-xl justify-center',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);
