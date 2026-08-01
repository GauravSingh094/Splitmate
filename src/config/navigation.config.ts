import {
  Activity,
  BarChart3,
  Bell,
  CreditCard,
  Home,
  Receipt,
  Settings,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import type { Permission } from '@/types/session';

export interface NavItemConfig {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger';
  permission?: Permission;
  disabled?: boolean;
  children?: Omit<NavItemConfig, 'children'>[];
}

export interface NavGroupConfig {
  id: string;
  title?: string;
  items: NavItemConfig[];
}

export const NAVIGATION_CONFIG: NavGroupConfig[] = [
  {
    id: 'main',
    title: 'Main Menu',
    items: [
      {
        id: 'overview',
        label: 'Overview',
        href: ROUTES.dashboard.overview,
        icon: Home,
      },
      {
        id: 'groups',
        label: 'Groups',
        href: ROUTES.dashboard.groups,
        icon: Users,
      },
      {
        id: 'expenses',
        label: 'Expenses',
        href: ROUTES.dashboard.expenses,
        icon: Receipt,
      },
      {
        id: 'settlements',
        label: 'Settlements',
        href: ROUTES.dashboard.settlements,
        icon: CreditCard,
      },
      {
        id: 'activity',
        label: 'Recent Activity',
        href: ROUTES.dashboard.activity,
        icon: Activity,
      },
      {
        id: 'analytics',
        label: 'Analytics',
        href: ROUTES.dashboard.analytics,
        icon: BarChart3,
      },
    ],
  },
  {
    id: 'system',
    title: 'Preferences',
    items: [
      {
        id: 'notifications',
        label: 'Notifications',
        href: ROUTES.dashboard.notifications,
        icon: Bell,
      },
      {
        id: 'settings',
        label: 'Settings',
        href: ROUTES.dashboard.settings.root,
        icon: Settings,
        children: [
          {
            id: 'profile',
            label: 'Profile',
            href: ROUTES.dashboard.settings.profile,
            icon: User,
          },
          {
            id: 'notifications-settings',
            label: 'Notification Rules',
            href: '#',
            icon: Bell,
            badge: 'Soon',
            badgeVariant: 'warning',
            disabled: true,
          },
          {
            id: 'billing',
            label: 'Billing & Plan',
            href: '#',
            icon: CreditCard,
            badge: 'Soon',
            badgeVariant: 'warning',
            disabled: true,
          },
        ],
      },
    ],
  },
];
