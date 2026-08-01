import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Throttles a callback to fire at most once per `limitMs` milliseconds.
 * Uses leading-edge invocation — fires immediately on first call,
 * then ignores subsequent calls until the throttle window expires.
 *
 * @example
 * const handleScroll = useThrottle(() => trackPosition(), 100);
 * window.addEventListener('scroll', handleScroll);
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  limitMs: number,
): (...args: Parameters<T>) => void {
  const lastRunRef = useRef(0);
  const callbackRef = useRef(callback);

  // Keep callback ref fresh on every render.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRunRef.current >= limitMs) {
        lastRunRef.current = now;
        callbackRef.current(...args);
      }
    },
    [limitMs],
  );
}

/**
 * Throttles a value — the returned value updates at most once per `limitMs`.
 *
 * @example
 * const throttledScrollY = useThrottledValue(scrollY, 100);
 */
export function useThrottledValue<T>(value: T, limitMs: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRunRef = useRef(0);

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRunRef.current >= limitMs) {
          setThrottledValue(value);
          lastRunRef.current = Date.now();
        }
      },
      limitMs - (Date.now() - lastRunRef.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, limitMs]);

  return throttledValue;
}
