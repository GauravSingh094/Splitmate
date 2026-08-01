'use client';

import { useSession } from '@/lib/context/session-context';
import {
  hasAtLeastRole,
  hasPermission,
  hasRole,
  type Permission,
  type UserRole,
} from '@/types/session';

export function usePermissions() {
  const { user } = useSession();

  return {
    hasPermission: (permission: Permission) => hasPermission(user, permission),
    hasRole: (role: UserRole) => hasRole(user, role),
    hasAtLeastRole: (minRole: UserRole) => hasAtLeastRole(user, minRole),
  };
}
