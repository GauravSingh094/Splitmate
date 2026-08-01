import { toast as sonnerToast } from 'sonner';

import type { ToastOptions } from '@/types/ui';

/**
 * Centralized toast helpers.
 *
 * Always use these helpers instead of calling `sonner` directly.
 * This abstraction makes it trivial to swap the toast library later.
 *
 * @example
 * import { toast } from '@/lib/toast';
 * toast.success('Expense added!');
 * toast.error('Something went wrong', { description: err.message });
 */
export const toast = {
  /** Display a success toast. */
  success(message: string, options?: ToastOptions): string | number {
    return sonnerToast.success(message, {
      id: options?.id,
      duration: options?.duration ?? 4000,
      description: options?.description,
      action: options?.action
        ? { label: options.action.label, onClick: options.action.onClick }
        : undefined,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    });
  },

  /** Display an error toast. */
  error(message: unknown, options?: ToastOptions): string | number {
    let strMessage = 'An error occurred';
    if (typeof message === 'string') {
      strMessage = message;
    } else if (message && typeof message === 'object') {
      if ('message' in message && typeof (message as { message: unknown }).message === 'string') {
        strMessage = (message as { message: string }).message;
      } else {
        try {
          strMessage = JSON.stringify(message);
        } catch {
          strMessage = String(message);
        }
      }
    } else if (message !== undefined && message !== null) {
      strMessage = String(message);
    }

    return sonnerToast.error(strMessage, {
      id: options?.id,
      duration: options?.duration ?? 6000,
      description: options?.description,
      action: options?.action
        ? { label: options.action.label, onClick: options.action.onClick }
        : undefined,
      onDismiss: options?.onDismiss,
    });
  },

  /** Display a warning toast. */
  warning(message: string, options?: ToastOptions): string | number {
    return sonnerToast.warning(message, {
      id: options?.id,
      duration: options?.duration ?? 5000,
      description: options?.description,
      action: options?.action
        ? { label: options.action.label, onClick: options.action.onClick }
        : undefined,
      onDismiss: options?.onDismiss,
    });
  },

  /** Display an informational toast. */
  info(message: string, options?: ToastOptions): string | number {
    return sonnerToast.info(message, {
      id: options?.id,
      duration: options?.duration ?? 4000,
      description: options?.description,
      action: options?.action
        ? { label: options.action.label, onClick: options.action.onClick }
        : undefined,
      onDismiss: options?.onDismiss,
    });
  },

  /** Display a loading toast. Update it with toast.success/error when resolved. */
  loading(message: string, options?: Omit<ToastOptions, 'action'>): string | number {
    return sonnerToast.loading(message, {
      id: options?.id,
      description: options?.description,
    });
  },

  /**
   * Display a promise toast that transitions through loading → success/error states.
   *
   * @example
   * toast.promise(saveExpense(data), {
   *   loading: 'Saving…',
   *   success: 'Expense saved!',
   *   error: (err) => err.message,
   * });
   */
  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: unknown) => string);
      description?: string;
    },
  ): Promise<T> {
    sonnerToast.promise(promise, {
      loading: messages.loading,
      success: messages.success as string,
      error: messages.error as string,
      description: messages.description,
    });
    return promise;
  },

  /** Dismiss a specific toast by ID. */
  dismiss(id?: string | number): void {
    sonnerToast.dismiss(id);
  },

  /** Dismiss all toasts. */
  dismissAll(): void {
    sonnerToast.dismiss();
  },
} as const;
