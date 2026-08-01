'use client';

import { type ReactNode, useEffect, useRef } from 'react';

interface FocusTrapProps {
  children: ReactNode;
  active?: boolean;
  autoFocus?: boolean;
  restoreFocus?: boolean;
}

/**
 * FocusTrap — Traps keyboard focus within its children when active.
 * Essential for accessible modal dialogs and overlay menus.
 */
export function FocusTrap({
  children,
  active = true,
  autoFocus = true,
  restoreFocus = true,
}: FocusTrapProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    if (restoreFocus && typeof document !== 'undefined') {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    const root = rootRef.current;
    if (!root) return;

    const focusableElements = root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (autoFocus && firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    root.addEventListener('keydown', handleKeyDown);

    return () => {
      root.removeEventListener('keydown', handleKeyDown);
      if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [active, autoFocus, restoreFocus]);

  return <div ref={rootRef}>{children}</div>;
}
