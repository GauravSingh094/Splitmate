'use client';

import React from 'react';

import { SkipNav } from '@/components/primitives/skip-nav';
import { Button } from '@/components/ui/button';
import { Icon } from '@/design-system/components/icon';
import { ShellProvider, useShell } from '../shell-context';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export interface DashboardShellProps {
  sidebarContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardShell({
  sidebarContent,
  headerContent,
  footerContent,
  children,
}: DashboardShellProps) {
  return (
    <ShellProvider activeShell="dashboard">
      <SkipNav />
      <div className="relative flex min-h-screen w-full overflow-x-hidden bg-background text-foreground">
        <DashboardSidebarContainer>{sidebarContent}</DashboardSidebarContainer>
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeaderContainer>{headerContent}</DashboardHeaderContainer>
          <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
          {footerContent && (
            <footer className="border-t border-border/40 p-4">{footerContent}</footer>
          )}
        </div>
      </div>
    </ShellProvider>
  );
}

function DashboardSidebarContainer({ children }: { children?: React.ReactNode }) {
  const { isSidebarOpen } = useShell();

  return (
    <aside
      className={cn(
        'hidden shrink-0 border-r border-border/60 bg-surface-raised transition-all duration-300 md:block',
        isSidebarOpen ? 'w-64' : 'w-16',
      )}
    >
      <div className="sticky top-0 flex h-screen flex-col gap-4 overflow-y-auto p-4">
        {children}
      </div>
    </aside>
  );
}

function DashboardHeaderContainer({ children }: { children?: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar } = useShell();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          className="hidden md:inline-flex"
        >
          <Icon icon={isSidebarOpen ? X : Menu} size={20} />
        </Button>
        {children}
      </div>
    </header>
  );
}
