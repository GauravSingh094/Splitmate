'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, PanelLeftClose, PanelLeftOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NAVIGATION_CONFIG, type NavItemConfig } from '@/config/navigation.config';
import { Icon } from '@/design-system/components/icon';
import { cn } from '@/lib/utils';
import { useNavigation } from './navigation-context';
import { useSidebar } from './sidebar-context';

export function AppSidebar() {
  const { isCollapsed, toggleSidebar, isMobileOpen, setMobileOpen } = useSidebar();
  const { pathname } = useNavigation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'relative z-20 hidden shrink-0 flex-col border-r border-border/60 bg-surface-raised transition-all duration-300 md:flex',
          isCollapsed ? 'w-16' : 'w-64',
        )}
      >
        {/* Sidebar Header / Brand */}
        <div className="flex h-16 items-center justify-between border-b border-border/40 px-4">
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-neo-1">
              <Icon icon={Sparkles} size={20} />
            </div>
            {!isCollapsed && (
              <span className="truncate text-lg font-bold tracking-tight text-foreground">
                Splitmate
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex"
          >
            <Icon icon={isCollapsed ? PanelLeftOpen : PanelLeftClose} size={18} />
          </Button>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {NAVIGATION_CONFIG.map((group) => (
            <div key={group.id} className="space-y-1">
              {!isCollapsed && group.title && (
                <h4 className="text-2xs mb-2 px-3 font-semibold tracking-wider text-muted-foreground/70 uppercase">
                  {group.title}
                </h4>
              )}
              {group.items.map((item) => (
                <SidebarNavItem
                  key={item.id}
                  item={item}
                  currentPath={pathname}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col gap-6 border-r border-border bg-surface-raised p-4 shadow-neo-4 md:hidden"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 transition-opacity hover:opacity-90"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-neo-1">
                    <Icon icon={Sparkles} size={20} />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-foreground">
                    Splitmate
                  </span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  ✕
                </Button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto">
                {NAVIGATION_CONFIG.map((group) => (
                  <div key={group.id} className="space-y-1">
                    {group.title && (
                      <h4 className="text-2xs mb-2 px-3 font-semibold tracking-wider text-muted-foreground/70 uppercase">
                        {group.title}
                      </h4>
                    )}
                    {group.items.map((item) => (
                      <SidebarNavItem
                        key={item.id}
                        item={item}
                        currentPath={pathname}
                        isCollapsed={false}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarNavItem({
  item,
  currentPath,
  isCollapsed,
  onNavigate,
}: {
  item: NavItemConfig;
  currentPath: string;
  isCollapsed: boolean;
  onNavigate?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');

  if (item.children && !isCollapsed) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground',
          )}
        >
          <div className="flex items-center gap-3">
            <Icon icon={item.icon} size={18} />
            <span>{item.label}</span>
          </div>
          <Icon
            icon={ChevronDown}
            size={16}
            className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-1 overflow-hidden pl-9"
            >
              {item.children.map((child) => (
                <Link
                  key={child.id}
                  href={child.disabled ? '#' : child.href}
                  onClick={(e) => {
                    if (child.disabled) {
                      e.preventDefault();
                    } else if (onNavigate) {
                      onNavigate();
                    }
                  }}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200',
                    currentPath === child.href && !child.disabled
                      ? 'bg-primary font-semibold text-primary-foreground shadow-neo-1'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                    child.disabled &&
                      'cursor-not-allowed opacity-60 hover:bg-transparent hover:text-muted-foreground',
                  )}
                >
                  <span>{child.label}</span>
                  {child.badge && (
                    <Badge variant={child.badgeVariant ?? 'default'} size="sm">
                      {child.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={isCollapsed ? item.label : undefined}
      className={cn(
        'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-primary font-semibold text-primary-foreground shadow-neo-1'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground',
        isCollapsed && 'justify-center px-0',
      )}
    >
      <Icon icon={item.icon} size={20} className="shrink-0" />
      {!isCollapsed && <span className="truncate">{item.label}</span>}
      {!isCollapsed && item.badge && (
        <Badge variant={item.badgeVariant ?? 'default'} size="sm" className="ml-auto">
          {item.badge}
        </Badge>
      )}
    </Link>
  );
}
