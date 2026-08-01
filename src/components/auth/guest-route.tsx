'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { DashboardSkeleton } from '@/components/feedback/skeletons/domain-skeletons';
import { ROUTES } from '@/constants/routes';
import { useSession } from '@/lib/context/session-context';

export interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(ROUTES.dashboard.overview);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
