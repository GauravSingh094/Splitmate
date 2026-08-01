'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useMediaQuery } from '@/hooks/use-media-query';

export interface SidebarContextValue {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  toggleMobile: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setMobileOpen: (open: boolean) => void;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [persistedCollapsed, setPersistedCollapsed] = useLocalStorage<boolean>(
    'splito_sidebar_collapsed',
    false,
  );
  const [isCollapsed, setCollapsedState] = useState<boolean>(persistedCollapsed);
  const [isMobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 767px)');

  const setCollapsed = (val: boolean) => {
    setCollapsedState(val);
    setPersistedCollapsed(val);
  };

  const toggleSidebar = () => setCollapsed(!isCollapsed);
  const toggleMobile = () => setMobileOpen(!isMobileOpen);

  // Close mobile drawer on desktop resize event
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        isMobileOpen,
        toggleSidebar,
        toggleMobile,
        setCollapsed,
        setMobileOpen,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('useSidebar must be used within <SidebarProvider>');
  }
  return ctx;
}
