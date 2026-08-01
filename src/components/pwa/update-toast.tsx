'use client';

import { RefreshCw, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/design-system/components/icon';

export function PwaUpdateToast() {
  const [show, setShow] = useState(false);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Reload the page when the new Service Worker takes over
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      navigator.serviceWorker.ready.then((reg) => {
        setSwRegistration(reg);

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // There is a new Service Worker available
                setShow(true);
              }
            });
          }
        });
      });
    }
  }, []);

  const handleUpdate = () => {
    if (swRegistration?.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed right-4 bottom-4 left-4 z-50 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-neo-2 md:right-8 md:bottom-24 md:left-auto md:w-96">
      <div className="flex flex-1 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 animate-pulse items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon icon={RefreshCw} size={20} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-card-foreground">Update Available</h4>
          <p className="text-xs text-muted-foreground">A new version of Splitmate is ready.</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="px-2 text-muted-foreground hover:text-foreground"
        >
          <Icon icon={X} size={16} />
        </Button>
        <Button variant="primary" size="sm" onClick={handleUpdate}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
