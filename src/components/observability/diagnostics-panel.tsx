'use client';

import { Activity, Cpu, Server, Wifi, X } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { featureFlags } from '@/lib/observability/feature-flags';
import { metricsCollector } from '@/lib/observability/metrics';
import { networkStatus } from '@/lib/offline/network-status';

export function DiagnosticsPanel() {
  const isMounted = useIsMounted();
  const [isOpen, setIsOpen] = useState(false);

  if (!isMounted) return null;
  if (!featureFlags.isEnabled('dev_diagnostics_panel')) return null;

  const metrics = metricsCollector.getMetrics();

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {!isOpen ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="border-primary/40 bg-surface/90 font-mono text-xs shadow-neo-2 backdrop-blur-xs"
          leftIcon={<Icon icon={Activity} size={14} className="text-primary" />}
        >
          Dev Diagnostics
        </Button>
      ) : (
        <Card
          variant="raised"
          className="w-80 space-y-3 border-border bg-surface/95 p-4 shadow-neo-4 backdrop-blur-md sm:w-96"
        >
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <div className="flex items-center gap-2">
              <Icon icon={Cpu} size={16} className="text-primary" />
              <h4 className="font-mono text-xs font-bold tracking-tight">System Diagnostics</h4>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon icon={X} size={16} />
            </button>
          </div>

          <div className="text-2xs grid grid-cols-2 gap-2 font-mono">
            <div className="flex flex-col gap-0.5 rounded-lg bg-surface-raised p-2">
              <span className="text-muted-foreground">Network</span>
              <span className="flex items-center gap-1 font-bold text-foreground">
                <Icon
                  icon={Wifi}
                  size={14}
                  className={networkStatus.isOnline ? 'text-success' : 'text-danger'}
                />
                {networkStatus.isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>

            <div className="flex flex-col gap-0.5 rounded-lg bg-surface-raised p-2">
              <span className="text-muted-foreground">API Latency</span>
              <span className="font-bold text-foreground">{metrics.avgLatencyMs}ms avg</span>
            </div>

            <div className="flex flex-col gap-0.5 rounded-lg bg-surface-raised p-2">
              <span className="text-muted-foreground">Cache Hit Rate</span>
              <span className="font-bold text-foreground">{metrics.cacheHitRatePercent}%</span>
            </div>

            <div className="flex flex-col gap-0.5 rounded-lg bg-surface-raised p-2">
              <span className="text-muted-foreground">Environment</span>
              <span className="font-bold text-foreground uppercase">{process.env.NODE_ENV}</span>
            </div>
          </div>

          <div className="text-2xs flex items-center justify-between border-t border-border/40 pt-2 font-mono text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon icon={Server} size={14} /> API v1 (apiv1.splitmate.page)
            </span>
            <Badge variant="success" size="sm">
              Healthy
            </Badge>
          </div>
        </Card>
      )}
    </div>
  );
}
