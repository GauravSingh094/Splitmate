'use client';

import { TooltipProvider as RadixTooltipProvider } from '@radix-ui/react-tooltip';

/**
 * TooltipProvider — wraps Radix UI's TooltipProvider at the application root.
 *
 * This is required for all Tooltip components to work. Providing it once
 * at the root is more performant than providing it per-tooltip.
 *
 * `delayDuration` is set to 400ms for a responsive but not instant feel.
 * `skipDelayDuration` allows fast navigation between tooltips.
 */
export function TooltipProvider({ children }: { readonly children: React.ReactNode }) {
  return (
    <RadixTooltipProvider delayDuration={400} skipDelayDuration={100}>
      {children}
    </RadixTooltipProvider>
  );
}
