'use client';

import { Receipt } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import type { Expense } from '@/features/expenses/schemas/expense.schema';

export interface ExpenseCardProps {
  expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const amount = parseFloat(expense.total_amount || '0');
  const formatAmount = (val: number) =>
    `$${val.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  return (
    <Link href={ROUTES.dashboard.groupExpenses(expense.group_id)}>
      <Card
        variant="interactive"
        className="flex items-center justify-between p-4 transition-all duration-200 hover:border-primary/50"
      >
        <div className="flex min-w-0 items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-neo-1">
            <Icon icon={Receipt} size={20} />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-bold tracking-tight text-foreground">
              {expense.title}
            </span>
            <div className="text-2xs mt-0.5 flex items-center gap-2 text-muted-foreground">
              <Badge variant="secondary" size="sm">
                {expense.split_type}
              </Badge>
              <span>•</span>
              <span>{new Date(expense.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <span className="text-sm font-bold tracking-tight text-primary">
            {formatAmount(amount)}
          </span>
          <span className="text-2xs tracking-wider text-muted-foreground uppercase">
            {expense.currency}
          </span>
        </div>
      </Card>
    </Link>
  );
}
