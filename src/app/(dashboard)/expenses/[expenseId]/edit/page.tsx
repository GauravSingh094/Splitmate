'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Workspace, WorkspaceBody, WorkspaceSection } from '@/components/workspace';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function EditExpensePage() {
  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceBody>
          <WorkspaceSection className="mx-auto max-w-md py-12 text-center">
            <Card variant="raised" className="space-y-4 p-8">
              <h2 className="text-lg font-bold text-foreground">Edit Expense</h2>
              <p className="text-xs text-muted-foreground">
                Expenses are edited directly within their respective group page.
              </p>
              <Link href={ROUTES.dashboard.groups}>
                <Button variant="primary" size="sm">
                  Go to Groups
                </Button>
              </Link>
            </Card>
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
