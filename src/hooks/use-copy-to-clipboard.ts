'use client';

import { useCallback, useState } from 'react';

interface UseCopyToClipboardOptions {
  /** Duration in ms before `copied` resets to false. Defaults to 2000. */
  resetAfterMs?: number;
}

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

/**
 * Copies text to the clipboard and provides feedback via the `copied` flag.
 *
 * @example
 * const { copied, copy } = useCopyToClipboard();
 * <button onClick={() => copy(value)}>{copied ? 'Copied!' : 'Copy'}</button>
 */
export function useCopyToClipboard({
  resetAfterMs = 2000,
}: UseCopyToClipboardOptions = {}): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!navigator.clipboard) {
        console.warn('[useCopyToClipboard] Clipboard API not available.');
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetAfterMs);
      } catch (error) {
        console.warn('[useCopyToClipboard] Failed to copy:', error);
      }
    },
    [resetAfterMs],
  );

  return { copied, copy };
}
