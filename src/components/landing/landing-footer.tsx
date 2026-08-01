'use client';

import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Mail,
  MessageSquare,
  Share2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/design-system/components/icon';
import { toast } from '@/lib/toast';

export function LandingFooter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Thank you for subscribing to Splitmate updates!');
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-surface-raised pt-16 pb-12 text-sm text-muted-foreground">
      {/* Background Decorative Accent Gradients */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Brand + 3 Link Columns */}
        <div className="grid grid-cols-1 gap-10 border-b border-border/40 pb-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1 & 2: Brand Info & Newsletter */}
          <div className="space-y-5 lg:col-span-2">
            <Link href="/" className="group flex inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-neo-2 transition-transform group-hover:scale-105">
                <Icon icon={Sparkles} size={24} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-foreground">
                Splitmate
              </span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              The next-generation expense sharing platform. Effortlessly split group bills, track
              pairwise debts, and settle up with zero friction.
            </p>

            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <Icon icon={CheckCircle2} size={14} />
              <span>All Systems Operational</span>
            </div>

            {/* Newsletter Subscription Box */}
            <form onSubmit={handleSubscribe} className="max-w-sm space-y-2 pt-2">
              <label htmlFor="newsletter-email" className="block text-xs font-bold text-foreground">
                Stay updated with new features
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-9 w-full rounded-xl border border-input bg-surface px-3 py-1.5 text-xs text-foreground shadow-neo-inset placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:outline-hidden"
                  />
                </div>
                <Button type="submit" variant="primary" size="sm" className="h-9 px-3">
                  <Icon icon={ArrowRight} size={16} />
                </Button>
              </div>
            </form>
          </div>

          {/* Col 3: Product Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-foreground uppercase">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#features" className="transition-colors hover:text-foreground">
                  Features & AI Split
                </a>
              </li>
              <li>
                <a href="#demo" className="transition-colors hover:text-foreground">
                  Interactive Calculator
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="transition-colors hover:text-foreground">
                  Debt Minimization
                </a>
              </li>
              <li>
                <a href="#pricing" className="transition-colors hover:text-foreground">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#mobile-app" className="transition-colors hover:text-foreground">
                  iOS & Android Apps
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Solutions & Features */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Split Modes
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-muted-foreground transition-colors hover:text-foreground">
                  Equal Splits
                </span>
              </li>
              <li>
                <span className="text-muted-foreground transition-colors hover:text-foreground">
                  Exact Amounts
                </span>
              </li>
              <li>
                <span className="text-muted-foreground transition-colors hover:text-foreground">
                  Percentage Shares
                </span>
              </li>
              <li>
                <span className="text-muted-foreground transition-colors hover:text-foreground">
                  Proportional Shares
                </span>
              </li>
              <li>
                <span className="text-muted-foreground transition-colors hover:text-foreground">
                  Multi-Currency Support
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-foreground uppercase">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://splitmate.page"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border bg-surface p-2 text-foreground shadow-neo-1 transition-colors hover:bg-accent"
                aria-label="Website"
              >
                <Icon icon={Globe} size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border bg-surface p-2 text-foreground shadow-neo-1 transition-colors hover:bg-accent"
                aria-label="Community"
              >
                <Icon icon={MessageSquare} size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border bg-surface p-2 text-foreground shadow-neo-1 transition-colors hover:bg-accent"
                aria-label="Share"
              >
                <Icon icon={Share2} size={18} />
              </a>
              <a
                href="mailto:support@splitmate.page"
                className="rounded-xl border border-border bg-surface p-2 text-foreground shadow-neo-1 transition-colors hover:bg-accent"
                aria-label="Email Support"
              >
                <Icon icon={Mail} size={18} />
              </a>
            </div>

            <div className="space-y-1 pt-2 text-xs">
              <p className="font-semibold text-foreground">Support & Inquiries</p>
              <p>support@splitmate.page</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Splitmate Inc. All rights reserved. Powered by Google
            DeepMind AGY Architecture.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
            <a href="#faq" className="transition-colors hover:text-foreground">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
