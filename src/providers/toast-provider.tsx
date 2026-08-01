'use client';

import { Toaster } from 'sonner';

import { useTheme } from '@/providers/theme-provider';

/**
 * ToastProvider — configures and renders the Sonner toaster.
 *
 * Placed inside ThemeProvider so it can read the active theme
 * and render toasts in the correct color scheme.
 *
 * Features:
 * - Tracks active theme (light/dark/system) automatically
 * - Rich colors for semantic variants (success/error/warning)
 * - Top-right position (consistent with most SaaS tools)
 * - Accessible: toasts are announced to screen readers
 * - Close button for user-initiated dismissal
 * - Stacked layout when multiple toasts are queued
 */
export function ToastProvider({ children }: { readonly children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {children}
      <Toaster
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        position="top-right"
        richColors
        closeButton
        expand={false}
        visibleToasts={5}
        toastOptions={{
          classNames: {
            toast: 'font-[family-name:var(--font-geist-sans)]',
          },
        }}
      />
    </>
  );
}
