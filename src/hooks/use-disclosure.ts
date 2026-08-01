'use client';

import { useCallback, useId, useState } from 'react';

export interface UseDisclosureReturn {
  /** Whether the disclosure is currently open. */
  isOpen: boolean;
  /** Open the disclosure. */
  open: () => void;
  /** Close the disclosure. */
  close: () => void;
  /** Toggle the disclosure. */
  toggle: () => void;
  /** Unique ID suitable for aria-controls / aria-labelledby pairing. */
  id: string;
  /** Props to spread on the trigger element. */
  triggerProps: {
    'aria-expanded': boolean;
    'aria-controls': string;
    onClick: () => void;
  };
  /** Props to spread on the controlled element. */
  contentProps: {
    id: string;
    hidden: boolean;
  };
}

/**
 * Manages open/closed state for accessible disclosures (modals, drawers, dropdowns).
 * Provides pre-built ARIA prop objects for the trigger and content elements.
 *
 * @example
 * const { isOpen, open, close, triggerProps, contentProps } = useDisclosure();
 * <button {...triggerProps}>Open</button>
 * <div {...contentProps}>Content</div>
 */
export function useDisclosure(initialOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const uid = useId();
  const contentId = `disclosure-content-${uid}`;

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    id: contentId,
    triggerProps: {
      'aria-expanded': isOpen,
      'aria-controls': contentId,
      onClick: toggle,
    },
    contentProps: {
      id: contentId,
      hidden: !isOpen,
    },
  };
}
