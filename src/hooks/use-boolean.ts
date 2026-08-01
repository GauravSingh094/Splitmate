'use client';

import { useCallback, useState } from 'react';

/**
 * Manages a boolean state with semantic toggle/set helpers.
 *
 * @example
 * const [isOpen, { setTrue, setFalse, toggle }] = useBoolean(false);
 */
export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, { setTrue, setFalse, toggle, reset, setValue }] as const;
}
