'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Mail, RefreshCw, User as UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { CardSkeleton } from '@/components/feedback/skeleton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/forms/form';
import { Input } from '@/components/forms/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { Icon } from '@/design-system/components/icon';
import { SUPPORTED_CURRENCIES } from '@/constants/currencies';
import { useCurrentUser, useUpdateCurrentUser } from '@/features/users/queries';
import { updateUserSchema, type UpdateUserInput } from '@/features/users/schemas/user.schema';

export default function ProfilePage() {
  const { data: user, isLoading, refetch } = useCurrentUser();
  const updateProfileMutation = useUpdateCurrentUser();

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    values: {
      name: user?.name ?? '',
      preferred_currency: user?.preferred_currency ?? 'USD',
    },
  });

  const onSubmit = async (data: UpdateUserInput) => {
    try {
      await updateProfileMutation.mutateAsync(data);
    } catch {
      // Error handled in mutation
    }
  };

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div className="flex w-full items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">User Profile</h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Manage your personal identity and account settings
              </p>
            </div>

            <Button variant="outline" size="icon" onClick={() => refetch()}>
              <Icon icon={RefreshCw} size={16} />
            </Button>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          {isLoading ? (
            <WorkspaceSection>
              <CardSkeleton />
            </WorkspaceSection>
          ) : !user ? (
            <WorkspaceSection>
              <div className="py-12 text-center text-xs text-muted-foreground">
                Profile unavailable.
              </div>
            </WorkspaceSection>
          ) : (
            <WorkspaceSection className="mx-auto w-full max-w-2xl space-y-6">
              {/* Profile Summary Card */}
              <Card
                variant="raised"
                className="flex flex-col items-center gap-6 border-border p-6 shadow-neo-2 sm:flex-row"
              >
                <Avatar fallback={user.name} size="xl" className="shadow-neo-2" />
                <div className="flex min-w-0 flex-1 flex-col text-center sm:text-left">
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <h2 className="truncate text-xl font-extrabold tracking-tight text-foreground">
                      {user.name}
                    </h2>
                    <Badge variant={user.is_active ? 'success' : 'secondary'} size="sm">
                      {user.is_active ? 'Active Account' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:justify-start">
                    <Icon icon={Mail} size={14} />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="text-2xs mt-3 flex items-center justify-center gap-3 text-muted-foreground sm:justify-start">
                    <span>
                      Currency:{' '}
                      <strong className="text-foreground">
                        {user.preferred_currency || 'USD'}
                      </strong>
                    </span>
                  </div>
                </div>
              </Card>

              {/* Edit Profile Form */}
              <Card variant="surface" className="border-border p-6 shadow-neo-1">
                <CardHeader className="px-0 pt-0 pb-4">
                  <CardTitle className="text-base font-bold">Edit Profile Details</CardTitle>
                </CardHeader>
                <CardBody className="px-0 pb-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                prefixIcon={<Icon icon={UserIcon} size={18} />}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="preferred_currency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Preferred Currency</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground shadow-neo-inset focus:ring-2 focus:ring-primary focus:outline-hidden"
                              >
                                {SUPPORTED_CURRENCIES.map((c) => (
                                  <option key={c.code} value={c.code}>
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={updateProfileMutation.isPending}
                        loadingText="Saving changes..."
                        leftIcon={<Icon icon={Check} size={16} />}
                        className="mt-2"
                      >
                        Save Profile
                      </Button>
                    </form>
                  </Form>
                </CardBody>
              </Card>
            </WorkspaceSection>
          )}
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
