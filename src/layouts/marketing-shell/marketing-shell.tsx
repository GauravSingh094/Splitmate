'use client';

import React from 'react';
import { SkipNav } from '@/components/primitives/skip-nav';

export interface MarketingShellProps {
  navigation?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function MarketingShell({ navigation, footer, children }: MarketingShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <SkipNav />
      {navigation && (
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
          {navigation}
        </header>
      )}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {footer && <footer className="border-t border-border/40">{footer}</footer>}
    </div>
  );
}
