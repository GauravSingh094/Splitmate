import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS class names.
 *
 * Combines `clsx` (conditional class joining) with `tailwind-merge`
 * (conflict resolution). This ensures that later classes override
 * earlier ones correctly (e.g. `p-4` overrides `p-2`).
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary', 'py-4')
 * // → 'px-4 py-4 bg-primary' (py-2 is overridden by py-4)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
