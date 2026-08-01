'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, KeyRound, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert } from '@/components/feedback/alert';
import { AuthRepository } from '@/features/auth/repository';
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
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { emailSchema } from '@/schemas/common';

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setErrorMsg(null);
    setIsLoading(true);

    try {
      await AuthRepository.forgotPassword(data.email);
      setIsSubmitted(true);
    } catch {
      // Always show success — API never reveals if email exists
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md p-4"
    >
      <Card variant="raised" className="border-border shadow-neo-2">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-neo-1">
            <Icon icon={isSubmitted ? CheckCircle2 : KeyRound} size={24} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isSubmitted ? 'Check your email' : 'Reset your password'}
          </CardTitle>
          <CardDescription>
            {isSubmitted
              ? 'We have sent password reset instructions to your email address.'
              : "Enter your email address and we'll send you a link to reset your password."}
          </CardDescription>
        </CardHeader>

        <CardBody>
          {errorMsg && (
            <div className="mb-4">
              <Alert variant="danger" title="Reset Error">
                {errorMsg}
              </Alert>
            </div>
          )}

          {isSubmitted ? (
            <div className="flex flex-col gap-4 py-2 text-center">
              <Alert variant="success" title="Email Sent">
                If an account exists with the provided email, you will receive reset instructions
                shortly.
              </Alert>
              <Button variant="outline" size="lg" fullWidth onClick={() => setIsSubmitted(false)}>
                Try another email
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          prefixIcon={<Icon icon={Mail} size={18} />}
                          autoComplete="email"
                          {...field}
                        />
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
                  isLoading={isLoading}
                  loadingText="Sending reset link..."
                  className="mt-2"
                >
                  Send Reset Link
                </Button>
              </form>
            </Form>
          )}
        </CardBody>

        <CardFooter className="justify-center border-t border-border/40 pt-4 text-center text-sm text-muted-foreground">
          <Link
            href={ROUTES.auth.login}
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
          >
            <Icon icon={ArrowLeft} size={16} />
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
