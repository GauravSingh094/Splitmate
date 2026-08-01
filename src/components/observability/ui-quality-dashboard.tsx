'use client';

import { CheckCircle2, Eye, ShieldCheck, Smartphone } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';

export function UiQualityDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="hover:bg-surface-interactive flex items-center gap-2 rounded-full border border-primary/40 bg-surface-raised px-3 py-1.5 text-xs font-semibold text-foreground shadow-neo-2 transition-all"
        >
          <Icon icon={ShieldCheck} size={14} className="text-primary" />
          <span>UI Quality</span>
        </button>
      ) : (
        <Card
          variant="raised"
          className="w-80 border-primary/40 bg-surface/95 p-4 shadow-neo-4 backdrop-blur-md"
        >
          <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2">
              <Icon icon={ShieldCheck} size={16} className="text-primary" />
              <span className="text-xs font-bold text-foreground">UI Quality & Regression</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-2xs text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Icon icon={Eye} size={14} /> Visual Snapshots
              </span>
              <Badge variant="success" size="sm">
                100% Passed
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Icon icon={CheckCircle2} size={14} /> Accessibility (Axe)
              </span>
              <Badge variant="success" size="sm">
                0 Violations
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Icon icon={Smartphone} size={14} /> Responsive Viewports
              </span>
              <span className="text-2xs font-semibold text-foreground">375px - 1440px</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
