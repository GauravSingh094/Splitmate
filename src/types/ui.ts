import type { ReactNode } from 'react';

/**
 * UI-layer types for modals, drawers, commands, and toasts.
 * All types are generic — no business logic.
 */

// ---- Modal ------------------------------------------------------

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalVariant = 'dialog' | 'drawer' | 'alert' | 'confirm';

/** Configuration passed to openModal() / openDrawer(). */
export interface ModalConfig {
  id: string;
  title?: string;
  description?: string;
  content: ReactNode;
  size?: ModalSize;
  variant?: ModalVariant;
  /** If true, clicking the overlay or pressing Escape does not close. */
  preventClose?: boolean;
  onClose?: () => void;
}

/** Configuration for confirmation dialogs. */
export interface ConfirmConfig {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

// ---- Drawer -----------------------------------------------------

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerConfig extends Omit<ModalConfig, 'variant' | 'size'> {
  side?: DrawerSide;
  width?: string;
}

// ---- Command Palette --------------------------------------------

export type CommandItemType = 'action' | 'navigation' | 'search' | 'settings';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string[];
  type: CommandItemType;
  group?: string;
  /** Whether to close the palette after running. Defaults to true. */
  closeOnSelect?: boolean;
  onSelect: () => void | Promise<void>;
}

export interface CommandGroup {
  id: string;
  label: string;
  items: CommandItem[];
}

// ---- Toast ------------------------------------------------------

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface ToastOptions {
  id?: string | number;
  duration?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  onAutoClose?: () => void;
}

// ---- Viewport ---------------------------------------------------

export interface ViewportDimensions {
  width: number;
  height: number;
  /** true when width < 768px */
  isMobile: boolean;
  /** true when 768px ≤ width < 1024px */
  isTablet: boolean;
  /** true when width ≥ 1024px */
  isDesktop: boolean;
}
