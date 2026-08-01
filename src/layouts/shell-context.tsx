'use client';

import { createContext, useContext, useState } from 'react';

export interface ShellContextValue {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  activeShell: 'dashboard' | 'marketing' | 'auth';
}

const ShellContext = createContext<ShellContextValue | null>(null);

export function ShellProvider({
  children,
  activeShell = 'dashboard',
}: {
  children: React.ReactNode;
  activeShell?: 'dashboard' | 'marketing' | 'auth';
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <ShellContext.Provider value={{ isSidebarOpen, toggleSidebar, setSidebarOpen, activeShell }}>
      {children}
    </ShellContext.Provider>
  );
}

export function useShell(): ShellContextValue {
  const ctx = useContext(ShellContext);
  if (!ctx) {
    throw new Error('useShell must be used within <ShellProvider>');
  }
  return ctx;
}
