'use client';

import React from 'react';
import { SkipNav } from '@/components/primitives/skip-nav';

export interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <SkipNav />
      <main id="main-content" className="flex w-full justify-center">
        {children}
      </main>
    </div>
  );
}
