'use client';

import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('splito_pwa_dismissed');
    if (dismissed === 'true') return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsDismissed(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsDismissed(true);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem('splito_pwa_dismissed', 'true');
    } catch {
      // Ignore storage errors
    }
  };

  if (isDismissed || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-full max-w-sm">
      <Card
        variant="raised"
        className="flex items-center justify-between gap-3 border-primary/40 bg-surface/95 p-4 shadow-neo-4 backdrop-blur-md"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-neo-1">
            <Icon icon={Download} size={20} />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-bold tracking-tight text-foreground">
              Install Splito App
            </span>
            <span className="text-2xs truncate text-muted-foreground">
              Add to Home Screen for fast offline access
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <Button variant="primary" size="xs" onClick={handleInstall}>
            Install
          </Button>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
          >
            <Icon icon={X} size={16} />
          </button>
        </div>
      </Card>
    </div>
  );
}
