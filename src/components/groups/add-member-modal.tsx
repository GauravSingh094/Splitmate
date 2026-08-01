'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
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
import { useAddMember } from '@/features/members/queries';
import { addMemberSchema, type AddMemberInput } from '@/features/members/schemas/member.schema';

export interface AddMemberModalProps {
  groupId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddMemberModal({ groupId, isOpen, onClose }: AddMemberModalProps) {
  const addMemberMutation = useAddMember(groupId);

  const form = useForm<AddMemberInput>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: AddMemberInput) => {
    try {
      // API only accepts { email } — no role field
      await addMemberMutation.mutateAsync({ email: data.email });
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
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Invite Group Member
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Enter the email address of the person you would like to invite to this group.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="friend@example.com" {...field} />
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
                    isLoading={addMemberMutation.isPending}
                    loadingText="Inviting..."
                  >
                    Send Invite
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
