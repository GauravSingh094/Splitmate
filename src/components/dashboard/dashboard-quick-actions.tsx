'use client';

import { BarChart3, CreditCard, PlusCircle, Users } from 'lucide-react';
import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';

export function DashboardQuickActions() {
  const actions = [
    {
      label: 'Add Expense',
      description: 'Record a split expense',
      icon: PlusCircle,
      href: ROUTES.dashboard.expenses,
    },
    {
      label: 'Create Group',
      description: 'Start a new expense group',
      icon: Users,
      href: ROUTES.dashboard.groups,
    },
    {
      label: 'Settle Up',
      description: 'Pay or collect balances',
      icon: CreditCard,
      href: ROUTES.dashboard.settlements,
    },
    {
      label: 'View Analytics',
      description: 'Detailed spending charts',
      icon: BarChart3,
      href: ROUTES.dashboard.analytics,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Link key={action.label} href={action.href}>
          <Card
            variant="interactive"
            className="flex items-center gap-4 p-4 transition-all duration-200 hover:border-primary/50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-neo-1">
              <Icon icon={action.icon} size={20} />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-bold tracking-tight text-foreground">
                {action.label}
              </span>
              <span className="text-2xs truncate text-muted-foreground">{action.description}</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
