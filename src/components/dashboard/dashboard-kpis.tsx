'use client';

import { CircleDollarSign, CreditCard, TrendingDown, TrendingUp } from 'lucide-react';

import { CardSkeleton } from '@/components/feedback/skeleton';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/constants/currencies';
import { Icon } from '@/design-system/components/icon';
import { useUserAnalytics } from '@/features/analytics/queries';
import { useSession } from '@/lib/context/session-context';
import { cn } from '@/lib/utils';

export function DashboardKPIs() {
  const { user } = useSession();
  const currency = user?.preferred_currency || 'INR';
  const { data: analytics, isLoading, isError } = useUserAnalytics();

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <div className="min-h-[160px] flex-1">
          <CardSkeleton className="h-full" />
        </div>
        <div className="flex flex-col gap-3 lg:w-80">
          <CardSkeleton className="h-[74px]" />
          <CardSkeleton className="h-[74px]" />
          <CardSkeleton className="h-[74px]" />
        </div>
      </div>
    );
  }

  if (isError || !analytics) {
    return (
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <Card
          variant="raised"
          className="flex flex-1 flex-col justify-between border-border/60 p-6 shadow-neo-2 md:p-8"
        >
          <div className="flex h-full flex-col gap-4 text-muted-foreground">
            <h3 className="text-sm font-bold tracking-widest uppercase">Net Balance</h3>
            <span className="text-5xl font-extrabold tracking-tighter">
              {formatCurrency(0, currency)}
            </span>
          </div>
        </Card>
      </div>
    );
  }

  const netBalance = parseFloat(analytics.net_balance);
  const totalPaid = parseFloat(analytics.total_paid_all_groups);
  const owedToOthers = parseFloat(analytics.total_owed_to_others);
  const othersOweUser = parseFloat(analytics.total_others_owe_user);

  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row">
      {/* Big Hero Card for Net Balance */}
      <Card
        variant="raised"
        className="relative flex flex-1 flex-col justify-between overflow-hidden border-border/60 p-6 shadow-neo-2 transition-colors hover:border-primary/30 md:p-8"
      >
        <div className="relative z-10 flex h-full flex-col gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="rounded-xl border border-primary/20 bg-primary/10 p-2 text-primary">
              <Icon icon={CircleDollarSign} size={20} />
            </div>
            <h3 className="text-xs font-bold tracking-widest text-foreground uppercase">
              Net Balance
            </h3>
          </div>
          <div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tighter text-foreground drop-shadow-sm">
                {netBalance < 0 ? '-' : ''}
                {formatCurrency(Math.abs(netBalance), currency)}
              </span>
            </div>
            <p
              className={cn(
                'mt-3 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-bold',
                netBalance > 0
                  ? 'border-success/20 bg-success/10 text-success'
                  : netBalance < 0
                    ? 'border-danger/20 bg-danger/10 text-danger'
                    : 'border-border bg-muted text-muted-foreground',
              )}
            >
              {netBalance > 0
                ? 'You are owed overall'
                : netBalance < 0
                  ? 'You owe overall'
                  : 'All settled up'}
            </p>
          </div>
        </div>

        {/* Background Decorative Icon */}
        <div className="transform-origin-bottom-right pointer-events-none absolute -right-6 -bottom-12 scale-[4.5] text-primary opacity-[0.04]">
          <Icon icon={CircleDollarSign} size={48} />
        </div>
      </Card>

      {/* Compact Side Panel for other 3 stats */}
      <div className="flex flex-col justify-center gap-3 lg:w-80">
        {/* Total Paid */}
        <div className="group flex items-center justify-between rounded-2xl border border-border/50 bg-surface p-4 transition-all hover:border-border hover:shadow-neo-1">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-border bg-surface-raised p-2.5 text-foreground shadow-neo-1 transition-transform group-hover:scale-105">
              <Icon icon={CreditCard} size={18} />
            </div>
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Total Paid
            </span>
          </div>
          <span className="text-base font-bold text-foreground">
            {formatCurrency(totalPaid, currency)}
          </span>
        </div>

        {/* You will get */}
        <div className="group flex items-center justify-between rounded-2xl border border-border/50 bg-surface p-4 transition-all hover:border-success/30 hover:shadow-neo-1">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-success/20 bg-success/10 p-2.5 text-success shadow-neo-1 transition-transform group-hover:scale-105">
              <Icon icon={TrendingUp} size={18} />
            </div>
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              You will get
            </span>
          </div>
          <span className="text-base font-bold text-success">
            {formatCurrency(owedToOthers, currency)}
          </span>
        </div>

        {/* You will pay */}
        <div className="group flex items-center justify-between rounded-2xl border border-border/50 bg-surface p-4 transition-all hover:border-danger/30 hover:shadow-neo-1">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-danger/20 bg-danger/10 p-2.5 text-danger shadow-neo-1 transition-transform group-hover:scale-105">
              <Icon icon={TrendingDown} size={18} />
            </div>
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              You will pay
            </span>
          </div>
          <span className="text-base font-bold text-danger">
            {formatCurrency(othersOweUser, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
