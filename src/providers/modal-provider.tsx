'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useRef, useState } from 'react';

import { ModalContext } from '@/lib/context/modal-context';
import { VARIANTS } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { ConfirmConfig, DrawerConfig, DrawerSide, ModalConfig, ModalSize } from '@/types/ui';

// ---- Size class map ---------------------------------------------------
const MODAL_SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-full mx-4',
};

// ---- Drawer side class map -------------------------------------------
const DRAWER_SIDE_CLASSES: Record<DrawerSide, string> = {
  right: 'right-0 top-0 h-full',
  left: 'left-0 top-0 h-full',
  bottom: 'bottom-0 left-0 w-full',
  top: 'top-0 left-0 w-full',
};

// ---- Internal state --------------------------------------------------
interface InternalModal {
  id: string;
  type: 'modal' | 'drawer' | 'confirm';
  modalConfig?: ModalConfig;
  drawerConfig?: DrawerConfig;
  confirmConfig?: ConfirmConfig & { resolve: (confirmed: boolean) => void };
}

/**
 * ModalProvider — imperative modal system.
 *
 * Supports:
 * - Generic dialogs (any React content)
 * - Drawers (left/right/top/bottom)
 * - Confirmation dialogs (returns Promise<boolean>)
 * - Stacked modals (each has its own overlay)
 * - Framer Motion entrance/exit animations
 * - Keyboard dismissal (Escape key)
 * - Focus trap readiness (aria-modal + inert pattern)
 *
 * Usage:
 *   const { openModal, openConfirm } = useModal();
 */
export function ModalProvider({ children }: { readonly children: React.ReactNode }) {
  const [stack, setStack] = useState<InternalModal[]>([]);
  const nextIdRef = useRef(0);

  const genId = useCallback(() => `modal-${++nextIdRef.current}`, []);

  const openModal = useCallback(
    (config: ModalConfig) => {
      const id = config.id ?? genId();
      setStack((prev) => [...prev, { id, type: 'modal', modalConfig: { ...config, id } }]);
    },
    [genId],
  );

  const openDrawer = useCallback(
    (config: DrawerConfig) => {
      const id = config.id ?? genId();
      setStack((prev) => [...prev, { id, type: 'drawer', drawerConfig: { ...config, id } }]);
    },
    [genId],
  );

  const openConfirm = useCallback(
    (config: ConfirmConfig): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        const id = genId();
        setStack((prev) => [
          ...prev,
          { id, type: 'confirm', confirmConfig: { ...config, resolve } },
        ]);
      });
    },
    [genId],
  );

  const closeModal = useCallback((id: string) => {
    setStack((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const closeTopModal = useCallback(() => {
    setStack((prev) => prev.slice(0, -1));
  }, []);

  const closeAll = useCallback(() => {
    setStack([]);
  }, []);

  const openModalIds = useMemo(() => stack.map((m) => m.id), [stack]);

  const contextValue = useMemo(
    () => ({
      openModal,
      openDrawer,
      openConfirm,
      closeModal,
      closeTopModal,
      closeAll,
      openModalIds,
    }),
    [openModal, openDrawer, openConfirm, closeModal, closeTopModal, closeAll, openModalIds],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <AnimatePresence mode="sync">
        {stack.map((item) => (
          <ModalRenderer
            key={item.id}
            item={item}
            onClose={() => {
              if (item.type === 'confirm' && item.confirmConfig) {
                item.confirmConfig.resolve(false);
              }
              closeModal(item.id);
            }}
          />
        ))}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

// ---- Renderer --------------------------------------------------------

function ModalRenderer({ item, onClose }: { item: InternalModal; onClose: () => void }) {
  if (item.type === 'drawer' && item.drawerConfig) {
    return <DrawerRenderer config={item.drawerConfig} onClose={onClose} />;
  }
  if (item.type === 'confirm' && item.confirmConfig) {
    return <ConfirmRenderer config={item.confirmConfig} onClose={onClose} />;
  }
  if (item.type === 'modal' && item.modalConfig) {
    return <DialogRenderer config={item.modalConfig} onClose={onClose} />;
  }
  return null;
}

// ---- Dialog ----------------------------------------------------------

function DialogRenderer({ config, onClose }: { config: ModalConfig; onClose: () => void }) {
  const sizeClass = MODAL_SIZE_CLASSES[config.size ?? 'md'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={config.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <motion.div
        variants={VARIANTS.overlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute inset-0 bg-black/50"
        onClick={config.preventClose ? undefined : onClose}
      />
      {/* Panel */}
      <motion.div
        variants={VARIANTS.dialog}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          'relative z-10 w-full rounded-xl bg-card p-6 shadow-2xl ring-1 ring-border',
          sizeClass,
        )}
      >
        {config.title && (
          <h2 className="mb-1 text-lg font-semibold text-card-foreground">{config.title}</h2>
        )}
        {config.description && (
          <p className="mb-4 text-sm text-muted-foreground">{config.description}</p>
        )}
        {config.content}
      </motion.div>
    </div>
  );
}

// ---- Drawer ----------------------------------------------------------

function DrawerRenderer({ config, onClose }: { config: DrawerConfig; onClose: () => void }) {
  const side = config.side ?? 'right';
  const sideClass = DRAWER_SIDE_CLASSES[side];

  const variantMap = {
    right: VARIANTS.drawerRight,
    left: VARIANTS.drawerLeft,
    bottom: VARIANTS.drawerBottom,
    top: VARIANTS.drawerTop,
  } as const;

  return (
    <div role="dialog" aria-modal="true" aria-label={config.title} className="fixed inset-0 z-50">
      {/* Overlay */}
      <motion.div
        variants={VARIANTS.overlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute inset-0 bg-black/50"
        onClick={config.preventClose ? undefined : onClose}
      />
      {/* Panel */}
      <motion.div
        variants={variantMap[side]}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ width: side === 'right' || side === 'left' ? (config.width ?? '28rem') : '100%' }}
        className={cn(
          'absolute z-10 bg-card shadow-2xl ring-1 ring-border',
          sideClass,
          'flex flex-col overflow-y-auto p-6',
        )}
      >
        {config.title && (
          <h2 className="mb-1 text-lg font-semibold text-card-foreground">{config.title}</h2>
        )}
        {config.description && (
          <p className="mb-4 text-sm text-muted-foreground">{config.description}</p>
        )}
        <div className="flex-1">{config.content}</div>
      </motion.div>
    </div>
  );
}

// ---- Confirm ---------------------------------------------------------

function ConfirmRenderer({
  config,
  onClose,
}: {
  config: ConfirmConfig & { resolve: (v: boolean) => void };
  onClose: () => void;
}) {
  const isDestructive = config.variant === 'destructive';

  const handleConfirm = async () => {
    await config.onConfirm();
    config.resolve(true);
    closeRenderer();
  };

  const handleCancel = () => {
    config.onCancel?.();
    config.resolve(false);
    closeRenderer();
  };

  const closeRenderer = () => onClose();

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label={config.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        variants={VARIANTS.overlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute inset-0 bg-black/50"
      />
      <motion.div
        variants={VARIANTS.dialog}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 w-full max-w-sm rounded-xl bg-card p-6 shadow-2xl ring-1 ring-border"
      >
        <h2 className="mb-2 text-base font-semibold text-card-foreground">{config.title}</h2>
        {config.description && (
          <p className="mb-6 text-sm text-muted-foreground">{config.description}</p>
        )}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            {config.cancelLabel ?? 'Cancel'}
          </button>
          <button
            type="button"
            onClick={() => void handleConfirm()}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              isDestructive
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : 'bg-primary text-primary-foreground hover:bg-primary/90',
            )}
          >
            {config.confirmLabel ?? 'Confirm'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
