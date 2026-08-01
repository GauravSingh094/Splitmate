import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

import { HOVER_LIFT } from '@/lib/motion';
import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-2xl border transition-all duration-200 text-card-foreground', {
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
});

type OmittedMotionProps = Omit<
  HTMLMotionProps<'div'>,
  'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'children'
>;

export interface CardProps extends OmittedMotionProps, VariantProps<typeof cardVariants> {
  enableHoverAnimation?: boolean;
  children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, enableHoverAnimation = false, children, ...props }, ref) => {
    const motionProps = enableHoverAnimation || variant === 'interactive' ? HOVER_LIFT : {};

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1.5 pb-4', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold tracking-tight text-foreground', className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export const CardBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1', className)} {...props} />
  ),
);
CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center border-t border-border/50 pt-4', className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';
