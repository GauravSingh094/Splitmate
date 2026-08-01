'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { ProtectedRoute } from '@/components/auth/protected-route';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/forms/form';
import { Input } from '@/components/forms/input';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { ROUTES } from '@/constants/routes';
import { SUPPORTED_CURRENCIES } from '@/constants/currencies';
import { Icon } from '@/design-system/components/icon';
import { useCreateGroup } from '@/features/groups/queries';
import { createGroupSchema, type CreateGroupInput } from '@/features/groups/schemas/group.schema';

export default function NewGroupPage() {
  const router = useRouter();
  const createGroupMutation = useCreateGroup();

  const form = useForm<CreateGroupInput>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      currency: 'USD',
    },
  });

  const onSubmit = async (data: CreateGroupInput) => {
    try {
      const created = await createGroupMutation.mutateAsync({
        name: data.name,
        description: data.description,
        currency: data.currency || 'USD',
      });
      if (created?.id) {
        router.push(ROUTES.dashboard.group(created.id));
      } else {
        router.push(ROUTES.dashboard.groups);
      }
    } catch {
      // Error handled in mutation
    }
  };

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <Link href={ROUTES.dashboard.groups}>
            <Button variant="ghost" size="xs" leftIcon={<Icon icon={ArrowLeft} size={14} />}>
              Back to Groups
            </Button>
          </Link>
        </WorkspaceHeader>

        <WorkspaceBody>
          <WorkspaceSection className="mx-auto w-full max-w-xl">
            <Card variant="raised" className="border-border shadow-neo-2">
              <CardHeader className="pb-2 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-neo-1">
                  <Icon icon={Users} size={24} />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Create a New Group
                </CardTitle>
                <CardDescription>
                  Start a group to effortlessly split bills, track balances, and settle debts with
                  friends.
                </CardDescription>
              </CardHeader>

              <CardBody>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Group Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Apartment 404, Japan Trip 2026" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Shared rent, groceries, and utility bills"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Currency</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:ring-2 focus:ring-primary focus:outline-hidden"
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
                      size="lg"
                      fullWidth
                      isLoading={createGroupMutation.isPending}
                      loadingText="Creating group..."
                      className="mt-4"
                    >
                      Create Group
                    </Button>
                  </form>
                </Form>
              </CardBody>
            </Card>
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
