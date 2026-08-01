'use client';

import { BellRing } from 'lucide-react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { ComingSoon } from '@/components/feedback/coming-soon';
import { FEATURE_FLAGS } from '@/constants/feature-flags';

export default function NotificationSettingsPage() {
  if (FEATURE_FLAGS.NOTIFICATIONS) {
    // Live implementation hook place
  }

  return (
    <ProtectedRoute>
      <ComingSoon
        title="Notification Rules & Preference Controls"
        description="Customize how and when you receive alerts. Set rules for instant email digests, push notifications, threshold reminders, and weekly summary reports."
        icon={BellRing}
        featureName="Preferences"
        status="Under Development"
        estimatedAvailability="Coming in v1.1"
      />
    </ProtectedRoute>
  );
}
