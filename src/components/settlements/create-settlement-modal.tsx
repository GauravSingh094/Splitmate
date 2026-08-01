'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
import { useCreateSettlement } from '@/features/settlements/queries';
import {
  createSettlementSchema,
  type CreateSettlementInput,
} from '@/features/settlements/schemas/settlement.schema';
import type { Member } from '@/features/members/schemas/member.schema';
import { useSession } from '@/lib/context/session-context';

export interface CreateSettlementModalProps {
  groupId: string;
  members: Member[];
  /** Pre-fill the "to" user (person being paid) */
  toUserId?: string;
  /** Pre-fill the amount */
  defaultAmount?: number;
  /** Currency of the group */
  currency?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSettlementModal({
  groupId,
  members,
  toUserId = '',
  defaultAmount = 0,
  currency = 'USD',
  isOpen,
  onClose,
}: CreateSettlementModalProps) {
  const { user } = useSession();
  const createSettlementMutation = useCreateSettlement(groupId);

  const form = useForm<CreateSettlementInput>({
    resolver: zodResolver(createSettlementSchema),
    defaultValues: {
      from_user_id: '',
      to_user_id: toUserId,
      amount: defaultAmount || '',
      currency,
      note: '',
    },
  });

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      form.reset({
        from_user_id: '',
        to_user_id: toUserId,
        amount: defaultAmount || '',
        currency,
        note: '',
      });
    }
  }, [isOpen, toUserId, defaultAmount, currency]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: CreateSettlementInput) => {
    try {
      await createSettlementMutation.mutateAsync({
        from_user_id: data.from_user_id,
        to_user_id: data.to_user_id,
        amount: Number(data.amount),
        currency: data.currency || currency,
        ...(data.note ? { note: data.note } : {}),
      });
      onClose();
      form.reset();
    } catch {
      // Error handled in mutation toast
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-md"
        >
          <Card variant="surface" className="flex flex-col gap-4 border-border p-6 shadow-neo-4">
            <div className="border-b border-border/40 pb-3">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Settle Up</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Record a payment to settle outstanding balances.
              </p>
            </div>

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
                      <FormLabel>Amount ({currency})</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0.01" placeholder="0.00" {...field} />
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
                        <Input placeholder="e.g. Paid via UPI, cash..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 border-t border-border/40 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={createSettlementMutation.isPending}
                    loadingText="Recording payment..."
                  >
                    Confirm Settlement
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
