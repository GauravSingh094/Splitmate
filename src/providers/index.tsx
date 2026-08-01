'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { useEffect } from 'react';

import { NetworkStatusBanner } from '@/components/feedback/network-status-banner';
import { DiagnosticsPanel } from '@/components/observability/diagnostics-panel';
import { InstallBanner } from '@/components/pwa/install-banner';
import { registerServiceWorker } from '@/lib/pwa/register-sw';

import { CommandProvider } from './command-provider';
import { ModalProvider } from './modal-provider';
import { MotionProvider } from './motion-provider';
import { QueryProvider } from './query-provider';
import { SessionProvider } from './session-provider';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from './toast-provider';
import { TooltipProvider } from './tooltip-provider';
import { ViewportProvider } from './viewport-provider';

/**
 * AppProviders — composes all application-level providers into a clean, flat tree.
 */
export function AppProviders({ children }: { readonly children: React.ReactNode }) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <ThemeProvider>
      <MotionProvider>
        <ViewportProvider>
          <SessionProvider>
            <QueryProvider>
              <ToastProvider>
                <TooltipProvider>
                  <ModalProvider>
                    <CommandProvider>
                      <NuqsAdapter>
                        <NetworkStatusBanner />
                        <DiagnosticsPanel />
                        <InstallBanner />
                        {children}
                      </NuqsAdapter>
                    </CommandProvider>
                  </ModalProvider>
                </TooltipProvider>
              </ToastProvider>
            </QueryProvider>
          </SessionProvider>
        </ViewportProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
