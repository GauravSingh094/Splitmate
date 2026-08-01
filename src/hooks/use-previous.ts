import { useEffect, useRef } from 'react';

/**
 * Returns the value from the previous render.
 * Useful for comparing current vs previous prop/state values.
 *
 * @example
 * const prevCount = usePrevious(count);
 * // On first render, returns undefined.
 * // On subsequent renders, returns the value from the previous render.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Reading ref during render is necessary for the usePrevious pattern.
  // eslint-disable-next-line react-hooks/refs
  return ref.current;
}
