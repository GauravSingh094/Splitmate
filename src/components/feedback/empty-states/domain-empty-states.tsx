import {
  AlertCircle,
  BellOff,
  Database,
  FileQuestion,
  Receipt,
  Search,
  ShieldAlert,
  Users,
  WifiOff,
  Wrench,
} from 'lucide-react';

import { EmptyState } from '../empty-state';
import { Button } from '@/components/ui/button';
import { Icon } from '@/design-system/components/icon';

export function NoDataEmptyState({
  title = 'No data available',
  description = 'There is currently no data to display.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <EmptyState icon={<Icon icon={Database} size={28} />} title={title} description={description} />
  );
}

export function NoSearchResultsEmptyState({ query }: { query?: string }) {
  return (
    <EmptyState
      icon={<Icon icon={Search} size={28} />}
      title="No results found"
      description={
        query
          ? `No matching results found for "${query}". Try refining your search.`
          : 'Try refining your search filters.'
      }
    />
  );
}

export function OfflineEmptyState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      icon={<Icon icon={WifiOff} size={28} />}
      title="You are offline"
      description="Please check your internet connection and try again."
      action={
        onRetry ? (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Retry Connection
          </Button>
        ) : undefined
      }
    />
  );
}

export function PermissionDeniedEmptyState() {
  return (
    <EmptyState
      icon={<Icon icon={ShieldAlert} size={28} />}
      title="Access Restricted"
      description="You do not have permission to view this resource. Contact your administrator."
    />
  );
}

export function NotFoundEmptyState() {
  return (
    <EmptyState
      icon={<Icon icon={FileQuestion} size={28} />}
      title="Page Not Found"
      description="The page or resource you are looking for does not exist or has been moved."
    />
  );
}

export function ServerErrorEmptyState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      icon={<Icon icon={AlertCircle} size={28} />}
      title="Server Error"
      description="Something went wrong on our server. Please try refreshing."
      action={
        onRetry ? (
          <Button variant="primary" size="sm" onClick={onRetry}>
            Retry
          </Button>
        ) : undefined
      }
    />
  );
}

export function MaintenanceEmptyState() {
  return (
    <EmptyState
      icon={<Icon icon={Wrench} size={28} />}
      title="Scheduled Maintenance"
      description="Splito is currently undergoing scheduled maintenance. Please check back shortly."
    />
  );
}

export function NoNotificationsEmptyState() {
  return (
    <EmptyState
      icon={<Icon icon={BellOff} size={28} />}
      title="No Notifications"
      description="You are all caught up! There are no new notifications."
    />
  );
}

export function NoGroupsEmptyState({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={<Icon icon={Users} size={28} />}
      title="No Groups Yet"
      description="Create a group to start sharing expenses with friends, roommates, or trip partners."
      action={
        onCreate ? (
          <Button variant="primary" size="md" onClick={onCreate}>
            Create Group
          </Button>
        ) : undefined
      }
    />
  );
}

export function NoExpensesEmptyState({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={<Icon icon={Receipt} size={28} />}
      title="No Expenses Recorded"
      description="Add an expense to start tracking splits and settlements."
      action={
        onCreate ? (
          <Button variant="primary" size="md" onClick={onCreate}>
            Add Expense
          </Button>
        ) : undefined
      }
    />
  );
}
