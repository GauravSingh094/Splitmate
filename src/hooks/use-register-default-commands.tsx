'use client';

import {
  BarChart3,
  CreditCard,
  Home,
  LogOut,
  Moon,
  PlusCircle,
  Receipt,
  Settings,
  Sun,
  User,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/providers/theme-provider';
import { useEffect } from 'react';

import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { useCommand } from '@/lib/context/command-context';

export function useRegisterDefaultCommands() {
  const { registerGroup, close } = useCommand();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // 1. Navigation Commands Group
    const cleanupNav = registerGroup({
      id: 'navigation',
      label: 'Navigation',
      items: [
        {
          id: 'nav-overview',
          label: 'Go to Overview',
          description: 'Dashboard financial overview',
          type: 'navigation',
          icon: <Icon icon={Home} size={16} />,
          onSelect: () => {
            router.push(ROUTES.dashboard.overview);
            close();
          },
        },
        {
          id: 'nav-groups',
          label: 'Go to Groups',
          description: 'Manage expense sharing groups',
          type: 'navigation',
          icon: <Icon icon={Users} size={16} />,
          onSelect: () => {
            router.push(ROUTES.dashboard.groups);
            close();
          },
        },
        {
          id: 'nav-expenses',
          label: 'Go to Expenses',
          description: 'View all expense split entries',
          type: 'navigation',
          icon: <Icon icon={Receipt} size={16} />,
          onSelect: () => {
            router.push(ROUTES.dashboard.expenses);
            close();
          },
        },
        {
          id: 'nav-settlements',
          label: 'Go to Settlements',
          description: 'Settlement payments and balances',
          type: 'navigation',
          icon: <Icon icon={CreditCard} size={16} />,
          onSelect: () => {
            router.push(ROUTES.dashboard.settlements);
            close();
          },
        },
        {
          id: 'nav-analytics',
          label: 'Go to Analytics',
          description: 'Spending charts and reports',
          type: 'navigation',
          icon: <Icon icon={BarChart3} size={16} />,
          onSelect: () => {
            router.push(ROUTES.dashboard.analytics);
            close();
          },
        },
        {
          id: 'nav-settings',
          label: 'Go to Settings',
          description: 'Account and notification preferences',
          type: 'navigation',
          icon: <Icon icon={Settings} size={16} />,
          onSelect: () => {
            router.push(ROUTES.dashboard.settings.root);
            close();
          },
        },
        {
          id: 'nav-profile',
          label: 'Go to Profile',
          description: 'User details and avatar',
          type: 'navigation',
          icon: <Icon icon={User} size={16} />,
          onSelect: () => {
            router.push(ROUTES.dashboard.settings.profile);
            close();
          },
        },
      ],
    });

    // 2. Quick Actions Group
    const cleanupActions = registerGroup({
      id: 'actions',
      label: 'Quick Actions',
      items: [
        {
          id: 'action-add-expense',
          label: 'Add Expense',
          description: 'Create a new expense entry',
          type: 'action',
          icon: <Icon icon={PlusCircle} size={16} />,
          onSelect: () => {
            router.push(ROUTES.dashboard.expenses);
            close();
          },
        },
        {
          id: 'action-create-group',
          label: 'Create Group',
          description: 'Start a new group with friends',
          type: 'action',
          icon: <Icon icon={Users} size={16} />,
          onSelect: () => {
            router.push(ROUTES.dashboard.groups);
            close();
          },
        },
        {
          id: 'action-toggle-theme',
          label: 'Toggle Theme',
          description: 'Switch between light and dark mode',
          type: 'action',
          icon: <Icon icon={theme === 'dark' ? Sun : Moon} size={16} />,
          onSelect: () => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
            close();
          },
        },
        {
          id: 'action-logout',
          label: 'Sign Out',
          description: 'Log out of your Splito account',
          type: 'action',
          icon: <Icon icon={LogOut} size={16} />,
          onSelect: () => {
            router.push(ROUTES.auth.login);
            close();
          },
        },
      ],
    });

    return () => {
      cleanupNav();
      cleanupActions();
    };
  }, [registerGroup, close, router, theme, setTheme]);
}
