import type { LucideIcon, LucideProps } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

export type IconSize = 14 | 16 | 18 | 20 | 24 | 28 | 32 | 40 | 48;

export interface IconProps extends Omit<LucideProps, 'size'> {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
}

const ICON_SIZE_MAP: Record<IconSize, string> = {
  14: 'h-4 w-4', // 16px
  16: 'h-[18px] w-[18px]', // 18px
  18: 'h-5 w-5', // 20px (enlarged for prominent visibility)
  20: 'h-6 w-6', // 24px (enlarged for prominent visibility)
  24: 'h-7 w-7', // 28px
  28: 'h-8 w-8', // 32px
  32: 'h-9 w-9', // 36px
  40: 'h-11 w-11', // 44px
  48: 'h-14 w-14', // 56px
};

/**
 * Standardized Lucide Icon Wrapper.
 * Enforces standardized icon sizing (14, 16, 18, 20, 24, 28, 32, 40, 48) and prominent visibility.
 *
 * @example
 * import { Check } from 'lucide-react';
 * <Icon icon={Check} size={20} className="text-primary" />
 */
export function Icon({ icon: LucideIconComponent, size = 20, className, ...props }: IconProps) {
  const sizeClass = ICON_SIZE_MAP[size] ?? 'h-6 w-6';

  return (
    <LucideIconComponent
      className={cn('aria-hidden:true shrink-0', sizeClass, className)}
      {...props}
    />
  );
}
