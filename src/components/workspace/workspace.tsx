import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface WorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Workspace = forwardRef<HTMLDivElement, WorkspaceProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mx-auto flex w-full max-w-[1200px] flex-col gap-6', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
Workspace.displayName = 'Workspace';

export const WorkspaceHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col justify-between gap-4 border-b border-border/40 pb-4 sm:flex-row sm:items-center',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
WorkspaceHeader.displayName = 'WorkspaceHeader';

export const WorkspaceBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-1 flex-col gap-6', className)} {...props}>
      {children}
    </div>
  ),
);
WorkspaceBody.displayName = 'WorkspaceBody';

export const WorkspaceSidebar = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex w-full shrink-0 flex-col gap-4 lg:w-80', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
WorkspaceSidebar.displayName = 'WorkspaceSidebar';

export const WorkspaceContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex min-w-0 flex-1 flex-col gap-4', className)} {...props}>
      {children}
    </div>
  ),
);
WorkspaceContent.displayName = 'WorkspaceContent';

export const WorkspaceFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between border-t border-border/40 pt-4 text-sm text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
WorkspaceFooter.displayName = 'WorkspaceFooter';

export const WorkspaceToolbar = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface-raised p-2 shadow-neo-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
WorkspaceToolbar.displayName = 'WorkspaceToolbar';

export const WorkspaceActions = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex shrink-0 items-center gap-2', className)} {...props}>
      {children}
    </div>
  ),
);
WorkspaceActions.displayName = 'WorkspaceActions';

export const WorkspaceSection = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <section ref={ref} className={cn('flex w-full flex-col gap-4', className)} {...props}>
      {children}
    </section>
  ),
);
WorkspaceSection.displayName = 'WorkspaceSection';
