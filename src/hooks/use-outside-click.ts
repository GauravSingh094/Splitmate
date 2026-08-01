'use client';

import { type RefObject, useEffect } from 'react';

/**
 * Fires a callback when the user clicks or touches outside the referenced element.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useOutsideClick(ref, () => setOpen(false));
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
