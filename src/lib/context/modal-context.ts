import { createContext, useContext } from 'react';

import type { ConfirmConfig, DrawerConfig, ModalConfig } from '@/types/ui';

export interface ModalContextValue {
  /** Open a dialog modal. */
  openModal: (config: ModalConfig) => void;
  /** Open a drawer. */
  openDrawer: (config: DrawerConfig) => void;
  /** Open a confirmation dialog. Returns a promise that resolves when user confirms/cancels. */
  openConfirm: (config: ConfirmConfig) => Promise<boolean>;
  /** Close a specific modal by ID. */
  closeModal: (id: string) => void;
  /** Close the most recently opened modal. */
  closeTopModal: () => void;
  /** Close all open modals. */
  closeAll: () => void;
  /** IDs of all currently open modals. */
  openModalIds: string[];
}

export const ModalContext = createContext<ModalContextValue | null>(null);
ModalContext.displayName = 'ModalContext';

/**
 * Access the modal system.
 * Must be used inside `<ModalProvider>`.
 *
 * @example
 * const { openModal, openConfirm, closeAll } = useModal();
 */
export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within <ModalProvider>');
  }
  return ctx;
}
