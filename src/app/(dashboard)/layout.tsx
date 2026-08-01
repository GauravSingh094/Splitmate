import React from 'react';
import { AuthenticatedLayout } from '@/layouts/authenticated-layout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
