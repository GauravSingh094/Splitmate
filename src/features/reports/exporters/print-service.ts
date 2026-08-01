/**
 * Print Service — Triggers browser print dialog for print-optimized layouts.
 */
export function triggerPrintPage(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}
