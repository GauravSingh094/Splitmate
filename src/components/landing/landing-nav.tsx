'use client';

import { ArrowRight, Moon, Sparkles, Sun } from 'lucide-react';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { useSession } from '@/lib/context/session-context';
import { useTheme } from '@/providers/theme-provider';

const emptySubscribe = () => () => {};

export function LandingNav() {
  const { isAuthenticated } = useSession();
  const { theme, setTheme } = useTheme();
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-neo-2 transition-transform group-hover:scale-105">
            <Icon icon={Sparkles} size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Splitmate</span>
        </Link>

        {/* Nav Links */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex"
        >
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#demo" className="transition-colors hover:text-foreground">
            Live Demo
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How It Works
          </a>
          <a href="#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Icon icon={isClient && theme === 'dark' ? Sun : Moon} size={18} />
          </Button>

          {isAuthenticated ? (
            <Link href={ROUTES.dashboard.overview}>
              <Button variant="primary" size="sm" rightIcon={<Icon icon={ArrowRight} size={16} />}>
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href={ROUTES.auth.login} className="hidden sm:inline-flex">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href={ROUTES.auth.register}>
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
