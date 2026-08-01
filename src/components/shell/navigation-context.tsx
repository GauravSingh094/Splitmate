'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useMemo } from 'react';

import { NAVIGATION_CONFIG, type NavItemConfig } from '@/config/navigation.config';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent: boolean;
}

export interface NavigationContextValue {
  pathname: string;
  activeNavItem: NavItemConfig | null;
  breadcrumbs: BreadcrumbItem[];
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const { activeNavItem, breadcrumbs } = useMemo(() => {
    let matchedItem: NavItemConfig | null = null;

    // Find active nav item
    for (const group of NAVIGATION_CONFIG) {
      for (const item of group.items) {
        if (pathname === item.href || pathname.startsWith(item.href + '/')) {
          matchedItem = item;
          break;
        }
        if (item.children) {
          for (const child of item.children) {
            if (pathname === child.href) {
              matchedItem = child;
              break;
            }
          }
        }
      }
    }

    // Generate dynamic breadcrumbs
    const crumbs: BreadcrumbItem[] = [
      {
        label: 'Dashboard',
        href: '/dashboard/overview',
        isCurrent: pathname === '/dashboard' || pathname === '/dashboard/overview',
      },
    ];

    const pathSegments = pathname.split('/').filter(Boolean);
    let accumPath = '';

    pathSegments.forEach((segment, idx) => {
      accumPath += `/${segment}`;
      if (segment === 'dashboard') return;

      const formattedLabel = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      crumbs.push({
        label: formattedLabel,
        href: accumPath,
        isCurrent: idx === pathSegments.length - 1,
      });
    });

    return { activeNavItem: matchedItem, breadcrumbs: crumbs };
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ pathname, activeNavItem, breadcrumbs }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation must be used within <NavigationProvider>');
  }
  return ctx;
}
