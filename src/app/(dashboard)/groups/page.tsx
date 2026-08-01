'use client';

import { Plus, Search, Users } from 'lucide-react';
import { useState } from 'react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { CardSkeleton } from '@/components/feedback/skeleton';
import { CreateGroupModal, GroupCard } from '@/components/groups';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/forms/input';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { Icon } from '@/design-system/components/icon';
import { useGroups } from '@/features/groups/queries';
import { useSearchUrlState } from '@/hooks/use-url-state';
import type { Group } from '@/features/groups/schemas/group.schema';

export default function GroupsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useSearchUrlState();
  const queryText = searchQuery ?? '';

  const { data: groups = [], isLoading } = useGroups();

  const filteredGroups = [...groups]
    .filter((g: Group) => g.name.toLowerCase().includes(queryText.toLowerCase()))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const activeGroups = filteredGroups.filter((g) => g.status !== 'settled');
  const settledGroups = filteredGroups.filter((g) => g.status === 'settled');

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Expense Groups</h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Manage your shared expense groups, invite members, and track balances
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              leftIcon={<Icon icon={Plus} size={18} />}
            >
              Create Group
            </Button>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          {/* Toolbar: Search */}
          <WorkspaceSection className="flex items-center gap-4">
            <div className="relative max-w-md flex-1">
              <Input
                type="text"
                placeholder="Search groups by name..."
                value={queryText}
                onChange={(e) => setSearchQuery(e.target.value)}
                prefixIcon={<Icon icon={Search} size={18} />}
              />
            </div>
          </WorkspaceSection>

          {/* Groups Grid */}
          <WorkspaceSection>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : filteredGroups.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 py-16 text-center shadow-neo-1">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-neo-1">
                  <Icon icon={Users} size={24} />
                </div>
                <h3 className="text-base font-semibold text-foreground">No groups found</h3>
                <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                  {queryText
                    ? `No groups matching "${queryText}". Try adjusting your search query.`
                    : 'Get started by creating your first group to manage shared expenses.'}
                </p>
                {!queryText && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-4"
                    onClick={() => setIsModalOpen(true)}
                    leftIcon={<Icon icon={Plus} size={16} />}
                  >
                    Create Group
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                {activeGroups.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {activeGroups.map((group: Group) => (
                      <GroupCard key={group.id} group={group} />
                    ))}
                  </div>
                )}

                {settledGroups.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="px-1 text-lg font-bold text-foreground">History</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {settledGroups.map((group: Group) => (
                        <GroupCard key={group.id} group={group} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>

      <CreateGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </ProtectedRoute>
  );
}
