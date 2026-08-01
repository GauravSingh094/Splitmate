'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { PwaInstallPrompt } from '@/components/pwa/install-prompt';
import { PwaUpdateToast } from '@/components/pwa/update-toast';
import { SkipNav } from '@/components/primitives/skip-nav';
import { AppHeader } from '@/components/shell/app-header';
import { AppSidebar } from '@/components/shell/app-sidebar';
import { KeyboardShortcutsListener } from '@/components/shell/keyboard-shortcuts';
import { NavigationProvider } from '@/components/shell/navigation-context';
import { SidebarProvider } from '@/components/shell/sidebar-context';
import { WorkspaceProvider } from '@/components/shell/workspace-context';

export interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <SidebarProvider>
      <NavigationProvider>
        <WorkspaceProvider>
          <SkipNav />
          <KeyboardShortcutsListener />
          <PwaInstallPrompt />
          <PwaUpdateToast />
          <div className="relative flex h-screen w-full overflow-hidden bg-background text-foreground">
            {/* Production Responsive Sidebar */}
            <AppSidebar />

            {/* Main Content Area */}
            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
              {/* Sticky Production Header */}
              <AppHeader />

              {/* Page Viewport & Animated Page Transitions */}
              <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  {children}
                </motion.div>
              </main>
            </div>
          </div>
        </WorkspaceProvider>
      </NavigationProvider>
    </SidebarProvider>
  );
}
