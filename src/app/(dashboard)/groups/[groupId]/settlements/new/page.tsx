'use client';

import { use } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CreditCard } from 'lucide-react';
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
import { Icon } from '@/design-system/components/icon';
import { useGroupDetail } from '@/features/groups/queries';
import { useGroupMembers } from '@/features/members/queries';
import { useCreateSettlement } from '@/features/settlements/queries';
import {
  createSettlementSchema,
  type CreateSettlementInput,
} from '@/features/settlements/schemas/settlement.schema';
import { useSession } from '@/lib/context/session-context';

export default function NewSettlementPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = use(params);
  const router = useRouter();
  const { user } = useSession();

  const { data: group } = useGroupDetail(groupId);
  const { data: members = [] } = useGroupMembers(groupId);
  const createSettlementMutation = useCreateSettlement(groupId);

  const form = useForm<CreateSettlementInput>({
    resolver: zodResolver(createSettlementSchema),
    defaultValues: {
      from_user_id: '',
      to_user_id: '',
      amount: '',
      currency: group?.default_currency || 'USD',
      note: '',
    },
  });

  const onSubmit = async (data: CreateSettlementInput) => {
    try {
      await createSettlementMutation.mutateAsync({
        from_user_id: data.from_user_id,
        to_user_id: data.to_user_id,
        amount: Number(data.amount),
        currency: data.currency || group?.default_currency || 'USD',
        ...(data.note ? { note: data.note } : {}),
      });
      router.push(ROUTES.dashboard.group(groupId));
    } catch {
      // Error handled in mutation
    }
  };

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <Link href={ROUTES.dashboard.group(groupId)}>
            <Button variant="ghost" size="xs" leftIcon={<Icon icon={ArrowLeft} size={14} />}>
              Back to Group
            </Button>
          </Link>
        </WorkspaceHeader>

        <WorkspaceBody>
          <WorkspaceSection className="mx-auto w-full max-w-md">
            <Card variant="raised" className="border-border shadow-neo-2">
              <CardHeader className="pb-2 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-neo-1">
                  <Icon icon={CreditCard} size={24} />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Record Settlement
                </CardTitle>
                <CardDescription>Settle debt balances by recording a payment.</CardDescription>
              </CardHeader>

              <CardBody>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="from_user_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Paid by (who paid)</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-hidden"
                            >
                              <option value="">Select payer...</option>
                              {members.map((m) => (
                                <option key={m.user_id} value={m.user_id}>
                                  {m.user_id === user?.id ? 'You' : m.name}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="to_user_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Paid to (who received)</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-hidden"
                            >
                              <option value="">Select payee...</option>
                              {members.map((m) => (
                                <option key={m.user_id} value={m.user_id}>
                                  {m.user_id === user?.id ? 'You' : m.name}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0.01"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Note (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Paid via bank transfer..." {...field} />
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
                      isLoading={createSettlementMutation.isPending}
                      loadingText="Recording settlement..."
                      className="mt-4"
                    >
                      Confirm Settlement
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
