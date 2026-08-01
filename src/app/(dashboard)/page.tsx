import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default function DashboardRootPage() {
  redirect(ROUTES.dashboard.overview);
}
