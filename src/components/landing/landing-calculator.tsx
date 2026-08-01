'use client';

import { CheckCircle2, GitBranch, Info, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';

type SplitType = 'EQUAL' | 'EXACT' | 'PERCENTAGE' | 'SHARE';

interface Participant {
  name: string;
  exact: number;
  percentage: number;
  shares: number;
}

export function LandingCalculator() {
  const [totalAmount, setTotalAmount] = useState<number>(120);
  const [currency, setCurrency] = useState<string>('USD');
  const [splitType, setSplitType] = useState<SplitType>('EQUAL');

  const [participants, setParticipants] = useState<Participant[]>([
    { name: 'Alex (Payer)', exact: 60, percentage: 50, shares: 2 },
    { name: 'Sarah', exact: 36, percentage: 30, shares: 1 },
    { name: 'Jordan', exact: 24, percentage: 20, shares: 1 },
  ]);

  // Dynamic calculations
  const calculateOwed = (p: Participant): number => {
    if (splitType === 'EQUAL') {
      return totalAmount / participants.length;
    }
    if (splitType === 'EXACT') {
      return p.exact;
    }
    if (splitType === 'PERCENTAGE') {
      return (totalAmount * p.percentage) / 100;
    }
    if (splitType === 'SHARE') {
      const totalShares = participants.reduce((sum, item) => sum + item.shares, 0);
      return totalShares > 0 ? (totalAmount * p.shares) / totalShares : 0;
    }
    return 0;
  };

  return (
    <section id="demo" className="relative border-y border-border/40 bg-surface/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
          <Badge variant="default" size="sm">
            <Icon icon={Sparkles} size={14} />
            <span>Interactive Demo</span>
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Try the Smart Split Engine Live
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Test how Splito calculates splits and debt minimizations in real time. Adjust amounts,
            split modes, and share allocations below.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="mx-auto max-w-4xl">
          <Card variant="raised" className="space-y-6 border-border p-6 shadow-neo-4 sm:p-8">
            {/* Calculator Header & Controls */}
            <div className="grid grid-cols-1 gap-4 border-b border-border/40 pb-6 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">
                  Total Expense Amount
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full rounded-xl border border-border bg-background py-2 pr-3 pl-8 text-base font-bold text-foreground shadow-neo-1 focus:ring-2 focus:ring-primary focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-neo-1 focus:ring-2 focus:ring-primary focus:outline-hidden"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">
                  Split Strategy
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['EQUAL', 'EXACT', 'PERCENTAGE', 'SHARE'] as SplitType[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSplitType(st)}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-all ${
                        splitType === st
                          ? 'border-primary bg-primary text-primary-foreground shadow-neo-1'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Participants Breakdown List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">Participant Allocation</h3>
                <span className="text-2xs flex items-center gap-1 text-muted-foreground">
                  <Icon icon={Info} size={14} />
                  {splitType === 'EQUAL' && 'Split equally among all members'}
                  {splitType === 'EXACT' && 'Specify custom fixed amounts'}
                  {splitType === 'PERCENTAGE' && 'Percentage based calculation'}
                  {splitType === 'SHARE' && 'Weighted share count distribution'}
                </span>
              </div>

              <div className="space-y-2">
                {participants.map((p, idx) => {
                  const owed = calculateOwed(p);
                  return (
                    <div
                      key={p.name}
                      className="flex flex-col justify-between gap-3 rounded-xl border border-border/60 bg-surface p-4 shadow-neo-1 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {p.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-foreground">{p.name}</span>
                      </div>

                      {/* Inputs for custom split types */}
                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        {splitType === 'EXACT' && (
                          <input
                            type="number"
                            value={p.exact}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setParticipants((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, exact: val } : item)),
                              );
                            }}
                            className="w-24 rounded-lg border border-border bg-background px-2 py-1 text-xs text-foreground"
                          />
                        )}

                        {splitType === 'PERCENTAGE' && (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={p.percentage}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setParticipants((prev) =>
                                  prev.map((item, i) =>
                                    i === idx ? { ...item, percentage: val } : item,
                                  ),
                                );
                              }}
                              className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-xs text-foreground"
                            />
                            <span className="text-xs text-muted-foreground">%</span>
                          </div>
                        )}

                        {splitType === 'SHARE' && (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={p.shares}
                              min="1"
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 1;
                                setParticipants((prev) =>
                                  prev.map((item, i) =>
                                    i === idx ? { ...item, shares: val } : item,
                                  ),
                                );
                              }}
                              className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-xs text-foreground"
                            />
                            <span className="text-xs text-muted-foreground">shares</span>
                          </div>
                        )}

                        <div className="text-right">
                          <p className="text-destructive text-base font-extrabold">
                            {currency} {owed.toFixed(2)}
                          </p>
                          <p className="text-3xs text-muted-foreground">owes to Alex</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Debt Minimization Result Banner */}
            <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-success/30 bg-success/5 p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-success/20 text-success">
                  <Icon icon={GitBranch} size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Simplified Debt Output</h4>
                  <p className="text-2xs mt-0.5 text-muted-foreground">
                    Instead of individual transactions, Splito reduces the balance paths
                    automatically.
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm" className="shrink-0">
                <Icon icon={CheckCircle2} size={14} />
                <span>Minimization Active</span>
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
