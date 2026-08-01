'use client';

import { ArrowDownRight, ArrowUpRight, CheckCircle2, DollarSign } from 'lucide-react';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';

export interface BalanceCardProps {
  userId: string;
  name: string;
  amount: number;
  currency: string;
  onSettleUp: (userId: string, amount: number) => void;
}

export function BalanceCard({ userId, name, amount, currency, onSettleUp }: BalanceCardProps) {
  const isOwed = amount > 0;
  const isSettled = Math.abs(amount) < 0.01;
  const formatAmount = (val: number) =>
    `$${Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  return (
    <Card
      variant="surface"
      className="flex items-center justify-between border-border p-4 shadow-neo-1"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Avatar fallback={name} size="md" />
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-bold tracking-tight text-foreground">{name}</span>
          <div className="text-2xs mt-0.5 flex items-center gap-1">
            {isSettled ? (
              <span className="flex items-center gap-1 font-medium text-muted-foreground">
                <Icon icon={CheckCircle2} size={14} className="text-success" /> Settled up
              </span>
            ) : isOwed ? (
              <span className="flex items-center gap-1 font-semibold text-success">
                <Icon icon={ArrowUpRight} size={14} /> Owes you
              </span>
            ) : (
              <span className="flex items-center gap-1 font-semibold text-danger">
                <Icon icon={ArrowDownRight} size={14} /> You owe
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="text-right">
          <span
            className={`block text-sm font-bold ${isSettled ? 'text-muted-foreground' : isOwed ? 'text-success' : 'text-danger'}`}
          >
            {formatAmount(amount)}
          </span>
          <span className="text-2xs text-muted-foreground uppercase">{currency}</span>
        </div>

        {!isSettled && !isOwed && (
          <Button
            variant="primary"
            size="xs"
            onClick={() => onSettleUp(userId, Math.abs(amount))}
            leftIcon={<Icon icon={DollarSign} size={14} />}
          >
            Settle Up
          </Button>
        )}
      </div>
    </Card>
  );
}
