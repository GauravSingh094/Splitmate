'use client';

import { useEffect } from 'react';

import { useCommand } from '@/lib/context/command-context';
import { useSidebar } from './sidebar-context';

export function KeyboardShortcutsListener() {
  const { toggleSidebar, setMobileOpen } = useSidebar();
  const { open: openCommand } = useCommand();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + B -> Toggle Sidebar
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
      }

      // Escape -> Close mobile drawer
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar, setMobileOpen, openCommand]);

  return null;
}
