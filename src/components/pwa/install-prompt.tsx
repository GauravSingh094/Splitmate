'use client';

import { Download, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/design-system/components/icon';
import { usePwaInstall } from '@/hooks/use-pwa-install';

export function PwaInstallPrompt() {
  const { isInstallable, install } = usePwaInstall();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only show once per session if dismissed
    const hasDismissed = sessionStorage.getItem('splito_pwa_dismissed');
    if (hasDismissed) {
      setTimeout(() => setDismissed(true), 0);
    }
  }, []);

  if (!isInstallable || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('splito_pwa_dismissed', 'true');
  };

  return (
    <div className="fixed right-4 bottom-4 left-4 z-50 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-neo-2 md:right-8 md:bottom-8 md:left-auto md:w-96">
      <div className="flex flex-1 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon icon={Download} size={20} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-card-foreground">Install Splitmate</h4>
          <p className="text-xs text-muted-foreground">Add to home screen for offline use.</p>
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
        <Button variant="primary" size="sm" onClick={install}>
          Install
        </Button>
      </div>
    </div>
  );
}
