'use client';

import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';

const FAQS = [
  {
    q: 'How does the Debt Simplification algorithm work?',
    a: 'Splito analyzes all pairwise debts within a group and calculates the minimal set of transactions needed to resolve everyone’s net balances. For example, if Alex owes Sarah $20 and Sarah owes Jordan $20, Splito simplifies it so Alex pays $20 directly to Jordan, eliminating 1 step.',
  },
  {
    q: 'Is Splito completely free to use?',
    a: 'Yes! Splito is 100% free for unlimited groups, unlimited expenses, and all 4 split calculation modes. We also offer an optional Pro tier for advanced AI receipt scanning and custom exports.',
  },
  {
    q: 'Can I split expenses in multiple currencies?',
    a: 'Absolutely. You can select your default group currency (USD, EUR, GBP, INR, etc.) and record expenses in any currency. Splito aggregates net balances automatically.',
  },
  {
    q: 'Do group members need an account to be included?',
    a: 'When you invite members via email, they receive an invitation to create an account and join your group. They can view, record, and settle expenses instantly.',
  },
  {
    q: 'How does Splito prevent duplicate expense entries?',
    a: 'Our API uses automatic UUID idempotency keys on expense creation. If you click "Save Expense" twice or have a patchy network connection, Splito guarantees the expense will only be recorded once.',
  },
];

export function LandingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <Badge variant="default" size="sm">
            <Icon icon={HelpCircle} size={14} />
            <span>Got Questions?</span>
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Everything you need to know about Splito.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Card
                key={faq.q}
                variant="raised"
                className="cursor-pointer overflow-hidden border-border shadow-neo-1 transition-all"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4 p-5">
                  <h3 className="text-sm font-bold text-foreground sm:text-base">{faq.q}</h3>
                  <Icon
                    icon={ChevronDown}
                    size={18}
                    className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </div>

                {isOpen && (
                  <div className="mt-1 border-t border-border/30 px-5 pt-0 pt-3 pb-5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {faq.a}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
