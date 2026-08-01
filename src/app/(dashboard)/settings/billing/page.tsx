'use client';

import { CreditCard } from 'lucide-react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { ComingSoon } from '@/components/feedback/coming-soon';
import { FEATURE_FLAGS } from '@/constants/feature-flags';

export default function BillingSettingsPage() {
  if (FEATURE_FLAGS.FUTURE_REPORTS) {
    // Live implementation hook place
  }

  return (
    <ProtectedRoute>
      <ComingSoon
        title="Subscription & Billing Management"
        description="Manage your Splito plan, view payment receipts, upgrade workspace limits, and configure automatic invoice billing."
        icon={CreditCard}
        featureName="Billing"
        status="Payment Gateway Integration In Progress"
        estimatedAvailability="Coming in v1.2"
      />
    </ProtectedRoute>
  );
}
