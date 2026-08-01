'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, WifiOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/design-system/components/icon';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { offlineMutationQueue } from '@/lib/offline/mutation-queue';

export function NetworkStatusBanner() {
  const isMounted = useIsMounted();
  const { isOnline, isSlow } = useNetworkStatus();

  if (!isMounted) return null;
  if (isOnline && !isSlow) return null;

  const handleRetry = () => {
    offlineMutationQueue.replayQueue();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
        className="fixed right-4 bottom-4 z-50 flex max-w-md items-center justify-between gap-4 rounded-2xl border border-border bg-surface-raised p-4 text-xs font-medium text-foreground shadow-neo-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-warning/15 text-warning">
            <Icon icon={WifiOff} size={18} />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {!isOnline ? 'You are currently offline' : 'Slow connection detected'}
            </p>
            <p className="text-2xs text-muted-foreground">
              {!isOnline
                ? 'Changes will sync automatically when reconnected.'
                : 'Responses may take longer than usual.'}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="xs"
          onClick={handleRetry}
          leftIcon={<Icon icon={RefreshCw} size={14} />}
        >
          Sync
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
