'use client';

import { CreditCard, PlusCircle, UserPlus, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';

const STEPS = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create Group & Invite Friends',
    description:
      'Set up a group in seconds for your apartment, trip, or event. Invite members via email link.',
  },
  {
    step: '02',
    icon: PlusCircle,
    title: 'Add Expenses & Choose Split Mode',
    description:
      'Log expenses on the go. Choose between equal, exact, percentage, or weighted share splits.',
  },
  {
    step: '03',
    icon: CreditCard,
    title: 'Auto-Simplify & Settle Up',
    description:
      'Splito automatically minimizes debt transactions. Settle outstanding balances with a single tap.',
  },
];

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <Badge variant="default" size="sm">
            <Icon icon={Zap} size={14} />
            <span>3 Simple Steps</span>
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            How Splito Works
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            From expense entry to full settlement in three easy steps.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <Card
              key={s.step}
              variant="raised"
              className="group relative space-y-6 border-border p-8 shadow-neo-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-4xl font-extrabold text-primary/30">{s.step}</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-neo-1 transition-transform group-hover:scale-105">
                  <Icon icon={s.icon} size={20} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground">{s.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {s.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
