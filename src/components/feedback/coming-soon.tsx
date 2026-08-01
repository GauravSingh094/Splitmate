'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Clock, Sparkles, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { toast } from '@/lib/toast';

export interface ComingSoonProps {
  /** Feature display title */
  title: string;
  /** Short description of what this feature will do */
  description: string;
  /** Lucide icon representing the feature */
  icon: LucideIcon;
  /** Short identifier for badge/labels */
  featureName?: string;
  /** Development status text */
  status?: string;
  /** Estimated availability timeline (optional) */
  estimatedAvailability?: string;
}

export function ComingSoon({
  title,
  description,
  icon,
  featureName = 'Feature',
  status = 'In Active Development',
  estimatedAvailability = 'Coming in Version 1.1',
}: ComingSoonProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifyMe = () => {
    setIsSubscribed(true);
    toast.success(`You'll be notified as soon as ${title} is available!`);
  };

  return (
    <Workspace>
      <WorkspaceHeader>
        <div className="flex w-full items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
              <Badge variant="warning" size="sm" icon={<Icon icon={Sparkles} size={14} />}>
                Coming Soon
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          </div>
          <Link href={ROUTES.dashboard.overview}>
            <Button variant="outline" size="sm" leftIcon={<Icon icon={ArrowLeft} size={16} />}>
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </WorkspaceHeader>

      <WorkspaceBody>
        <WorkspaceSection className="flex flex-col items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl text-center"
          >
            <Card
              variant="raised"
              className="relative flex flex-col items-center gap-6 overflow-hidden border-border bg-gradient-to-b from-surface via-surface to-background/50 p-8 shadow-neo-3 sm:p-10"
            >
              {/* Decorative background glow */}
              <div
                className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-24 -bottom-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
              />

              {/* Feature Icon Shield */}
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-neo-2 ring-1 ring-primary/20">
                  <Icon icon={icon} size={40} />
                </div>
                <div className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-warning text-warning-foreground shadow-neo-1 ring-2 ring-background">
                  <Icon icon={Clock} size={14} />
                </div>
              </div>

              {/* Content Block */}
              <div className="max-w-md space-y-2">
                <Badge variant="outline" size="sm" className="mb-1">
                  {featureName} Module
                </Badge>
                <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
                <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
              </div>

              {/* Status Box */}
              <div className="w-full space-y-2 rounded-xl border border-border/60 bg-surface-raised/80 p-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-muted-foreground">Backend API Status</span>
                  <Badge variant="secondary" size="sm">
                    {status}
                  </Badge>
                </div>
                <div className="text-2xs flex items-center justify-between border-t border-border/40 pt-2 text-muted-foreground">
                  <span>Planned Release</span>
                  <span className="font-semibold text-foreground">{estimatedAvailability}</span>
                </div>
              </div>

              {/* Explanation Note */}
              <p className="text-2xs max-w-sm text-muted-foreground">
                The frontend components and data architecture for {title} are fully staged. Live
                data syncing will be activated once the production API services launch.
              </p>

              {/* Action Buttons */}
              <div className="flex w-full flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                <Link href={ROUTES.dashboard.overview} className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    leftIcon={<Icon icon={ArrowLeft} size={16} />}
                  >
                    Back to Dashboard
                  </Button>
                </Link>
                <Button
                  variant={isSubscribed ? 'secondary' : 'outline'}
                  size="md"
                  fullWidth
                  disabled={isSubscribed}
                  onClick={handleNotifyMe}
                  leftIcon={<Icon icon={Bell} size={16} />}
                  className="w-full sm:w-auto"
                >
                  {isSubscribed ? 'Notified!' : 'Notify Me'}
                </Button>
              </div>
            </Card>
          </motion.div>
        </WorkspaceSection>
      </WorkspaceBody>
    </Workspace>
  );
}
