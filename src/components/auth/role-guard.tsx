'use client';

import React from 'react';

import { PermissionDeniedEmptyState } from '@/components/feedback/empty-states/domain-empty-states';
import { useSession } from '@/lib/context/session-context';
import { hasAtLeastRole, type UserRole } from '@/types/session';

export interface RoleGuardProps {
  requiredRole: UserRole;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function RoleGuard({ requiredRole, fallback, children }: RoleGuardProps) {
  const { user } = useSession();

  const isAuthorized = hasAtLeastRole(user, requiredRole);

  if (!isAuthorized) {
    return fallback ?? <PermissionDeniedEmptyState />;
  }

  return <>{children}</>;
}
