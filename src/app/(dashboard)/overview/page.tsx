'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import {
  DashboardActivityWidget,
  DashboardCharts,
  DashboardExpensesWidget,
  DashboardGroupsWidget,
  DashboardKPIs,
  DashboardQuickActions,
} from '@/components/dashboard';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceContent,
  WorkspaceHeader,
  WorkspaceSection,
  WorkspaceSidebar,
} from '@/components/workspace';

export default function DashboardOverviewPage() {
  return (
    <ProtectedRoute>
      <Workspace>
        {/* Workspace Header */}
        <WorkspaceHeader>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Financial Overview
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Track your shared expenses, active balances, and recent group activities
            </p>
          </div>
        </WorkspaceHeader>

        {/* Workspace Body */}
        <WorkspaceBody>
          {/* KPI Metrics Summary */}
          <WorkspaceSection>
            <DashboardKPIs />
          </WorkspaceSection>

          {/* Quick Actions Bar */}
          <WorkspaceSection>
            <DashboardQuickActions />
          </WorkspaceSection>

          {/* Main Financial Visualizations */}
          <WorkspaceSection>
            <DashboardCharts />
          </WorkspaceSection>

          {/* 2-Column Content Grid: Latest Expenses & Active Groups + Activity Sidebar */}
          <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-3">
            <WorkspaceContent className="space-y-6 lg:col-span-2">
              <DashboardExpensesWidget />
              <DashboardGroupsWidget />
            </WorkspaceContent>

            <WorkspaceSidebar className="w-full">
              <DashboardActivityWidget />
            </WorkspaceSidebar>
          </div>
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
