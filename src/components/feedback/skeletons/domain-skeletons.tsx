import { CardSkeleton, Skeleton } from '../skeleton';

export function DashboardSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48 rounded-xl" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Skeleton className="h-[320px] rounded-2xl lg:col-span-2" />
        <Skeleton className="h-[320px] rounded-2xl" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Skeleton className="h-5 w-24 rounded-lg" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-5 w-32 rounded-lg" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="mt-2 h-12 w-full rounded-xl" />
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="flex w-64 flex-col gap-3 border-r border-border p-4">
      <Skeleton className="mb-4 h-8 w-32 rounded-xl" />
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function WidgetSkeleton() {
  return <Skeleton className="h-[220px] w-full rounded-2xl" />;
}
