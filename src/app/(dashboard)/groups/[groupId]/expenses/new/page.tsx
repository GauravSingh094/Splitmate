'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

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
import { Card } from '@/components/ui/card';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
  WorkspaceSection,
} from '@/components/workspace';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { useCreateExpense } from '@/features/expenses/queries';
import {
  createExpenseSchema,
  type CreateExpenseInput,
  type SplitType,
} from '@/features/expenses/schemas/expense.schema';
import { useGroupDetail } from '@/features/groups/queries';
import { useGroupMembers } from '@/features/members/queries';
import { useSession } from '@/lib/context/session-context';

const SPLIT_TYPES: { value: SplitType; label: string; hint: string }[] = [
  { value: 'EQUAL', label: 'Equal', hint: 'Split evenly among selected members' },
  { value: 'EXACT', label: 'Exact', hint: 'Enter the exact amount each person owes' },
  {
    value: 'PERCENTAGE',
    label: 'Percentage',
    hint: 'Specify what % each person owes (must total 100%)',
  },
  { value: 'SHARE', label: 'Shares', hint: 'Assign share counts — divided proportionally' },
];

export default function CreateExpensePage() {
  const params = useParams<{ groupId: string }>();
  const groupId = params.groupId;
  const router = useRouter();
  const { user } = useSession();

  const { data: group } = useGroupDetail(groupId);
  const { data: members } = useGroupMembers(groupId);
  const createExpenseMutation = useCreateExpense(groupId);

  const groupMembers = members ?? group?.members ?? [];
  const defaultCurrency = group?.default_currency || 'USD';

  const form = useForm<CreateExpenseInput>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      title: '',
      description: '',
      total_amount: '',
      currency: defaultCurrency,
      paid_by_user_id: user?.id || '',
      split_type: 'EQUAL',
      participants_equal: [],
      participants_exact: [],
      participants_percentage: [],
      participants_share: [],
    },
  });

  const splitType = useWatch({ control: form.control, name: 'split_type' });

  // When group loads or split type changes, reset participant arrays
  useEffect(() => {
    if (groupMembers.length === 0) return;

    if (splitType === 'EQUAL') {
      form.setValue(
        'participants_equal',
        groupMembers.map((m) => ({ user_id: m.user_id })),
      );
    } else if (splitType === 'EXACT') {
      form.setValue(
        'participants_exact',
        groupMembers.map((m) => ({ user_id: m.user_id, owed_amount: '' })),
      );
    } else if (splitType === 'PERCENTAGE') {
      const share = Math.floor(100 / groupMembers.length);
      const remainder = 100 - share * groupMembers.length;
      form.setValue(
        'participants_percentage',
        groupMembers.map((m, i) => ({
          user_id: m.user_id,
          percentage: i === 0 ? share + remainder : share,
        })),
      );
    } else if (splitType === 'SHARE') {
      form.setValue(
        'participants_share',
        groupMembers.map((m) => ({ user_id: m.user_id, shares: 1 })),
      );
    }
  }, [splitType, groupMembers.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update currency from group default
  useEffect(() => {
    if (defaultCurrency) form.setValue('currency', defaultCurrency);
  }, [defaultCurrency]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalAmount =
    parseFloat(String(useWatch({ control: form.control, name: 'total_amount' }))) || 0;
  const equalParticipants = useWatch({ control: form.control, name: 'participants_equal' }) ?? [];
  const percentageParticipants =
    useWatch({ control: form.control, name: 'participants_percentage' }) ?? [];
  const shareParticipants = useWatch({ control: form.control, name: 'participants_share' }) ?? [];
  const percentageTotal = percentageParticipants.reduce(
    (sum, p) => sum + (parseFloat(String(p?.percentage ?? 0)) || 0),
    0,
  );

  const onSubmit = async (data: CreateExpenseInput) => {
    try {
      await createExpenseMutation.mutateAsync({
        ...data,
        total_amount: Number(data.total_amount),
      });
      router.push(ROUTES.dashboard.group(groupId));
    } catch {
      // Errors handled in mutation via toast
    }
  };

  return (
    <ProtectedRoute>
      <Workspace>
        <WorkspaceHeader>
          <div className="flex w-full flex-col gap-1">
            <Link
              href={ROUTES.dashboard.group(groupId)}
              className="flex w-fit items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon icon={ArrowLeft} size={14} />
              {group?.name ?? 'Group'}
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Add New Expense</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Record a shared expense in {group?.name ?? 'this group'}
            </p>
          </div>
        </WorkspaceHeader>

        <WorkspaceBody>
          <WorkspaceSection>
            <Card variant="raised" className="max-w-2xl border-border p-6 shadow-neo-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Title & Description */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expense Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Dinner, Groceries, Flight tickets" {...field} />
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
                          <Input placeholder="Additional details..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Amount & Currency */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="total_amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Amount</FormLabel>
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
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <div className="flex h-10 w-full cursor-not-allowed items-center justify-between rounded-xl border border-border bg-surface-raised px-3.5 py-2 text-sm font-bold text-foreground opacity-90 shadow-neo-inset">
                              <span>
                                {field.value || group?.default_currency || defaultCurrency || 'INR'}
                              </span>
                              <span className="text-3xs rounded border border-primary/20 bg-primary/10 px-2 py-0.5 font-semibold text-primary uppercase">
                                Group Locked
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Paid By */}
                  <FormField
                    control={form.control}
                    name="paid_by_user_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paid By</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-hidden"
                          >
                            <option value="">Select member...</option>
                            {groupMembers.map((m) => (
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

                  {/* Split Type Selector */}
                  <FormField
                    control={form.control}
                    name="split_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Split Type</FormLabel>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {SPLIT_TYPES.map((st) => (
                            <button
                              key={st.value}
                              type="button"
                              onClick={() => field.onChange(st.value)}
                              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                                field.value === st.value
                                  ? 'border-primary bg-primary text-primary-foreground shadow-neo-1'
                                  : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground'
                              }`}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>
                        {/* Split type hint */}
                        <p className="text-2xs mt-1 flex items-center gap-1 text-muted-foreground">
                          <Icon icon={Info} size={14} />
                          {SPLIT_TYPES.find((s) => s.value === splitType)?.hint}
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ─── Dynamic participant inputs based on split type ─── */}

                  {/* EQUAL: checkboxes to include/exclude members */}
                  {splitType === 'EQUAL' && (
                    <div>
                      <p className="mb-2 text-xs font-medium text-foreground">Split Among</p>
                      <div className="space-y-1.5">
                        {groupMembers.map((m) => {
                          const isChecked = equalParticipants.some((p) => p.user_id === m.user_id);
                          const perPerson =
                            isChecked && equalParticipants.length > 0 && totalAmount > 0
                              ? (totalAmount / equalParticipants.length).toFixed(2)
                              : null;

                          return (
                            <label
                              key={m.user_id}
                              className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 transition-colors hover:border-primary/30"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    const current = form.getValues('participants_equal') ?? [];
                                    if (e.target.checked) {
                                      form.setValue('participants_equal', [
                                        ...current,
                                        { user_id: m.user_id },
                                      ]);
                                    } else {
                                      form.setValue(
                                        'participants_equal',
                                        current.filter((p) => p.user_id !== m.user_id),
                                      );
                                    }
                                  }}
                                  className="rounded"
                                />
                                <span className="text-sm text-foreground">{m.name}</span>
                              </div>
                              {perPerson && (
                                <span className="text-xs text-muted-foreground">
                                  {defaultCurrency} {perPerson}
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* EXACT: amount per member */}
                  {splitType === 'EXACT' && (
                    <div>
                      <p className="mb-2 text-xs font-medium text-foreground">Exact Amounts</p>
                      <div className="space-y-2">
                        {groupMembers.map((m, idx) => (
                          <div key={m.user_id} className="flex items-center gap-3">
                            <span className="w-1/3 truncate text-sm text-foreground">{m.name}</span>
                            <FormField
                              control={form.control}
                              name={`participants_exact.${idx}.owed_amount`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      placeholder="0.00"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                        {totalAmount > 0 && (
                          <p className="text-2xs text-muted-foreground">
                            Total: {defaultCurrency} {totalAmount.toFixed(2)} — amounts should sum
                            to the total.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* PERCENTAGE: percentage per member */}
                  {splitType === 'PERCENTAGE' && (
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-medium text-foreground">Percentages</p>
                        <span
                          className={`text-2xs font-semibold ${
                            Math.abs(percentageTotal - 100) < 0.01
                              ? 'text-success'
                              : 'text-destructive'
                          }`}
                        >
                          Total: {percentageTotal.toFixed(1)}%{' '}
                          {Math.abs(percentageTotal - 100) < 0.01 ? '✓' : '(must be 100%)'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {groupMembers.map((m, idx) => {
                          const pct =
                            parseFloat(String(percentageParticipants[idx]?.percentage ?? 0)) || 0;
                          const amountForMember = totalAmount > 0 ? (totalAmount * pct) / 100 : 0;
                          return (
                            <div key={m.user_id} className="flex items-center gap-3">
                              <span className="w-1/3 truncate text-sm text-foreground">
                                {m.name}
                              </span>
                              <FormField
                                control={form.control}
                                name={`participants_percentage.${idx}.percentage`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="100"
                                        placeholder="0"
                                        suffixIcon={
                                          <span className="pr-2 text-xs text-muted-foreground">
                                            %
                                          </span>
                                        }
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {amountForMember > 0 && (
                                <span className="text-2xs w-20 text-right text-muted-foreground">
                                  {defaultCurrency} {amountForMember.toFixed(2)}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SHARE: shares per member */}
                  {splitType === 'SHARE' && (
                    <div>
                      <p className="mb-2 text-xs font-medium text-foreground">Share Counts</p>
                      <div className="space-y-2">
                        {groupMembers.map((m, idx) => {
                          const totalShares = shareParticipants.reduce(
                            (sum, p) => sum + (parseInt(String(p?.shares ?? 0)) || 0),
                            0,
                          );
                          const myShares =
                            parseInt(String(shareParticipants[idx]?.shares ?? 0)) || 0;
                          const amountForMember =
                            totalShares > 0 && totalAmount > 0
                              ? (totalAmount * myShares) / totalShares
                              : 0;

                          return (
                            <div key={m.user_id} className="flex items-center gap-3">
                              <span className="w-1/3 truncate text-sm text-foreground">
                                {m.name}
                              </span>
                              <FormField
                                control={form.control}
                                name={`participants_share.${idx}.shares`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step="1"
                                        min="0"
                                        placeholder="1"
                                        suffixIcon={
                                          <span className="pr-2 text-xs text-muted-foreground">
                                            shares
                                          </span>
                                        }
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {amountForMember > 0 && (
                                <span className="text-2xs w-20 text-right text-muted-foreground">
                                  {defaultCurrency} {amountForMember.toFixed(2)}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 border-t border-border/40 pt-4">
                    <Link href={ROUTES.dashboard.group(groupId)}>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={createExpenseMutation.isPending}
                      loadingText="Saving..."
                    >
                      Save Expense
                    </Button>
                  </div>
                </form>
              </Form>
            </Card>
          </WorkspaceSection>
        </WorkspaceBody>
      </Workspace>
    </ProtectedRoute>
  );
}
