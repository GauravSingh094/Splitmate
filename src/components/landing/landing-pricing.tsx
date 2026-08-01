'use client';

import { ArrowRight, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';

const PLANS = [
  {
    name: 'Free Forever',
    price: '$0',
    period: 'forever',
    description: 'Perfect for roommates, trips, and everyday group expenses.',
    features: [
      'Unlimited Expense Groups',
      'All 4 Split Modes (Equal, Exact, %, Shares)',
      'Smart Debt Simplification Engine',
      'Multi-Currency Aggregation',
      'Real-Time In-App Notifications',
      'Financial Analytics & Charts',
    ],
    cta: 'Get Started Free',
    isPopular: false,
    href: ROUTES.auth.register,
  },
  {
    name: 'Splito Pro',
    price: '$4.99',
    period: 'per month',
    description: 'For power users needing AI receipt scanning and custom exports.',
    features: [
      'Everything in Free Plan',
      'AI OCR Receipt Auto-Scanning',
      'Export PDF & CSV Expense Reports',
      'Custom Notification Rules',
      'Multi-Group Cross-Aggregation',
      'Priority 24/7 Support',
    ],
    cta: 'Upgrade to Pro',
    isPopular: true,
    href: ROUTES.auth.register,
  },
];

export function LandingPricing() {
  return (
    <section id="pricing" className="relative border-t border-border/40 bg-surface/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <Badge variant="default" size="sm">
            <Icon icon={Sparkles} size={14} />
            <span>Simple Transparent Pricing</span>
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Start Free. Upgrade Anytime.
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Everything you need for everyday group expense management is completely free.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {PLANS.map((p) => (
            <Card
              key={p.name}
              variant="raised"
              className={`relative flex flex-col justify-between border-border p-8 shadow-neo-4 ${
                p.isPopular ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : ''
              }`}
            >
              {p.isPopular && (
                <Badge variant="default" size="sm" className="absolute -top-3 right-6 shadow-neo-1">
                  Most Popular
                </Badge>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground">
                    {p.price}
                  </span>
                  <span className="text-xs text-muted-foreground">/ {p.period}</span>
                </div>

                <div className="space-y-3 border-t border-border/40 pt-4">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-xs text-foreground">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                        <Icon icon={Check} size={14} />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link href={p.href} className="w-full">
                  <Button
                    variant={p.isPopular ? 'primary' : 'outline'}
                    size="lg"
                    fullWidth
                    rightIcon={<Icon icon={ArrowRight} size={16} />}
                  >
                    {p.cta}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
