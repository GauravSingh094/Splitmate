import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DashboardPage = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex w-full flex-col gap-6', className)} {...props}>
      {children}
    </div>
  ),
);
DashboardPage.displayName = 'DashboardPage';

export const SettingsPage = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mx-auto flex w-full max-w-4xl flex-col gap-6', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
SettingsPage.displayName = 'SettingsPage';

export const AnalyticsPage = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex w-full flex-col gap-6', className)} {...props}>
      {children}
    </div>
  ),
);
AnalyticsPage.displayName = 'AnalyticsPage';

export const ContentPage = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mx-auto flex w-full max-w-3xl flex-col gap-6', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
ContentPage.displayName = 'ContentPage';

export const TwoColumnLayout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid w-full grid-cols-1 gap-6 lg:grid-cols-3', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
TwoColumnLayout.displayName = 'TwoColumnLayout';

export const ThreeColumnLayout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
ThreeColumnLayout.displayName = 'ThreeColumnLayout';

export const StickySidebarLayout = forwardRef<
  HTMLDivElement,
  { sidebar: React.ReactNode; content: React.ReactNode; className?: string }
>(({ sidebar, content, className }, ref) => (
  <div ref={ref} className={cn('flex w-full flex-col items-start gap-6 lg:flex-row', className)}>
    <div className="w-full shrink-0 lg:sticky lg:top-20 lg:w-80">{sidebar}</div>
    <div className="w-full min-w-0 flex-1">{content}</div>
  </div>
));
StickySidebarLayout.displayName = 'StickySidebarLayout';
