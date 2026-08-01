'use client';

import { BarChart3, BellRing, GitBranch, Globe2, Lock, Receipt, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';

const FEATURES = [
  {
    icon: GitBranch,
    title: 'Debt Simplification Algorithm',
    description:
      'Our intelligent algorithm optimizes pairwise debts in your group. Reduces 10+ complex transactions down to just 2 simple payment paths.',
    badge: 'Core Engine',
  },
  {
    icon: Receipt,
    title: '4 Flexible Split Types',
    description:
      'Split expenses equally, by exact amount, by custom percentage, or by weighted shares. Perfect for any shared living or travel setup.',
    badge: 'Smart Splits',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Financial Analytics',
    description:
      'Interactive spending charts, monthly trend breakdown, member contribution analysis, and settlement rate tracking.',
    badge: 'Insights',
  },
  {
    icon: Globe2,
    title: 'Multi-Currency Aggregation',
    description:
      'Support for global currencies (USD, EUR, GBP, INR, JPY...). Record expenses in any currency and auto-aggregate your net balances.',
    badge: 'Global',
  },
  {
    icon: BellRing,
    title: 'Instant Push & In-App Alerts',
    description:
      'Never miss an update. Instant notifications whenever someone adds an expense, records a settlement, or invites a new member.',
    badge: 'Real-Time',
  },
  {
    icon: Lock,
    title: 'Bank-Grade Security',
    description:
      'Idempotency-protected API endpoints, token refresh queue, encrypted data transmission, and strict authorization scoping.',
    badge: 'Secure',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="relative bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <Badge variant="default" size="sm">
            <Icon icon={Sparkles} size={14} />
            <span>Built for Modern Groups</span>
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Everything You Need to Manage Shared Money
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Eliminate awkward money conversations with roommates, travel partners, and friends.
            Splito automates every step of expense splitting.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card
              key={f.title}
              variant="raised"
              className="group flex flex-col justify-between border-border p-6 shadow-neo-2 transition-all hover:border-primary/50 hover:shadow-neo-3"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-neo-1 transition-transform group-hover:scale-110">
                    <Icon icon={f.icon} size={24} />
                  </div>
                  <Badge variant="secondary" size="sm">
                    {f.badge}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-foreground">{f.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {f.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
