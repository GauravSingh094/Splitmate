'use client';

import { Calculator, Divide, Percent, PieChart } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';
import type { SplitType } from '@/features/expenses/split-calculator';

export interface SplitTypeSelectorProps {
  value: SplitType;
  onChange: (type: SplitType) => void;
}

export function SplitTypeSelector({ value, onChange }: SplitTypeSelectorProps) {
  const options: { type: SplitType; label: string; description: string; icon: typeof Divide }[] = [
    {
      type: 'equal',
      label: 'Equal Split',
      description: 'Divide total equally among participants',
      icon: Divide,
    },
    {
      type: 'exact',
      label: 'Exact Amounts',
      description: 'Specify custom dollar amounts',
      icon: Calculator,
    },
    {
      type: 'percentage',
      label: 'Percentage',
      description: 'Split by percentage ratios',
      icon: Percent,
    },
    {
      type: 'share',
      label: 'Share Based',
      description: 'Assign shares (e.g. 1 share, 2 shares)',
      icon: PieChart,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((opt) => {
        const isSelected = value === opt.type;
        return (
          <Card
            key={opt.type}
            variant="interactive"
            onClick={() => onChange(opt.type)}
            className={`flex cursor-pointer items-center gap-3 p-3.5 transition-all ${
              isSelected ? 'border-primary bg-primary/5 shadow-neo-2' : 'hover:border-primary/50'
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-raised text-muted-foreground'
              }`}
            >
              <Icon icon={opt.icon} size={18} />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {opt.label}
              </span>
              <span className="text-2xs truncate text-muted-foreground">{opt.description}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
