'use client';

import { ChevronRight, Menu, Moon, Search, Sun } from 'lucide-react';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/design-system/components/icon';
import { useCommand } from '@/lib/context/command-context';
import { useTheme } from '@/providers/theme-provider';
import { useNavigation } from './navigation-context';
import { NotificationPanel } from './notification-panel';
import { ProfileMenu } from './profile-menu';
import { useSidebar } from './sidebar-context';

const emptySubscribe = () => () => {};

export function AppHeader() {
  const { toggleMobile } = useSidebar();
  const { breadcrumbs } = useNavigation();
  const { open: openCommand } = useCommand();
  const { theme, setTheme } = useTheme();
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur-md sm:px-6">
      {/* Left: Mobile Menu Trigger & Dynamic Breadcrumbs */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobile}
          aria-label="Open navigation drawer"
          className="md:hidden"
        >
          <Icon icon={Menu} size={20} />
        </Button>

        <nav
          aria-label="Breadcrumbs"
          className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex"
        >
          {breadcrumbs.map((crumb, idx) => (
            <div key={crumb.href} className="flex items-center gap-1.5">
              {idx > 0 && (
                <Icon icon={ChevronRight} size={14} className="text-muted-foreground/60" />
              )}
              {crumb.isCurrent ? (
                <span className="font-semibold text-foreground">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="transition-colors hover:text-foreground">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Actions (Search, Theme, Notifications, Profile) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Trigger */}
        <button
          onClick={openCommand}
          className="hidden h-9 items-center gap-2 rounded-xl border border-border/60 bg-surface-raised px-3 text-xs text-muted-foreground shadow-neo-1 transition-all hover:border-primary/50 sm:flex"
        >
          <Icon icon={Search} size={16} />
          <span>Search or type a command...</span>
          <kbd className="text-3xs ml-2 rounded border border-border/60 bg-muted px-1.5 py-0.5 font-mono font-semibold text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        <Button
          variant="ghost"
          size="icon"
          onClick={openCommand}
          aria-label="Open command palette"
          className="sm:hidden"
        >
          <Icon icon={Search} size={20} />
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          <Icon icon={isClient && theme === 'dark' ? Sun : Moon} size={20} />
        </Button>

        {/* Notifications */}
        <NotificationPanel />

        {/* Profile Menu */}
        <ProfileMenu />
      </div>
    </header>
  );
}
