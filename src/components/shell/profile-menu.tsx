'use client';

import { Building2, Command, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { useCommand } from '@/lib/context/command-context';
import { useSession } from '@/lib/context/session-context';

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useSession();
  const { open: openCommand } = useCommand();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    router.push(ROUTES.auth.login);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        className="flex items-center gap-2 rounded-full p-0.5 ring-offset-background transition-all hover:ring-2 hover:ring-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Avatar fallback={user?.name ?? 'Alex Morgan'} size="sm" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card
            variant="raised"
            className="absolute top-full right-0 z-50 mt-2 w-64 animate-in border border-border p-2 shadow-neo-4 duration-150 fade-in slide-in-from-top-2"
          >
            {/* User Details */}
            <div className="mb-1 border-b border-border/40 px-3 py-2">
              <p className="truncate text-sm font-semibold text-foreground">
                {user?.name ?? 'Alex Morgan'}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email ?? 'alex@example.com'}
              </p>
            </div>

            {/* Organization Switcher Slot */}
            <div className="my-1 flex items-center justify-between rounded-lg border border-border/40 bg-surface-raised px-3 py-2 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon icon={Building2} size={14} className="text-primary" />
                <span className="truncate font-semibold text-foreground">Personal Workspace</span>
              </div>
              <span className="text-3xs rounded bg-primary/10 px-1.5 py-0.5 font-bold text-primary uppercase">
                Free
              </span>
            </div>

            {/* Navigation Links */}
            <div className="space-y-0.5">
              <Link
                href={ROUTES.dashboard.settings.profile}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Icon icon={User} size={16} />
                Profile
              </Link>
              <Link
                href={ROUTES.dashboard.settings.root}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Icon icon={Settings} size={16} />
                Account Settings
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  openCommand();
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-2.5">
                  <Icon icon={Command} size={16} />
                  <span>Command Palette</span>
                </div>
                <kbd className="text-3xs rounded border border-border/60 bg-muted px-1.5 py-0.5 font-mono font-semibold text-muted-foreground">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Sign Out */}
            <div className="mt-1 border-t border-border/40 pt-1">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-danger transition-colors hover:bg-danger/10"
              >
                <Icon icon={LogOut} size={16} />
                Sign Out
              </button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
