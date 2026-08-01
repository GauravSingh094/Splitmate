'use client';

import React from 'react';

import { PermissionDeniedEmptyState } from '@/components/feedback/empty-states/domain-empty-states';
import { useSession } from '@/lib/context/session-context';
import { hasPermission, type Permission } from '@/types/session';

export interface PermissionGuardProps {
  permission: Permission;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({ permission, fallback, children }: PermissionGuardProps) {
  const { user } = useSession();

  const isAuthorized = hasPermission(user, permission);

  if (!isAuthorized) {
    return fallback ?? <PermissionDeniedEmptyState />;
  }

  return <>{children}</>;
}
