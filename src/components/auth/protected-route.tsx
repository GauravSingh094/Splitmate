'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { DashboardSkeleton } from '@/components/feedback/skeletons/domain-skeletons';
import { ROUTES } from '@/constants/routes';
import { useSession } from '@/lib/context/session-context';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const returnUrl = encodeURIComponent(pathname);
      router.replace(`${ROUTES.auth.login}?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return fallback ?? <DashboardSkeleton />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
