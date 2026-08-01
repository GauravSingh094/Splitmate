'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { GuestRoute } from '@/components/auth/guest-route';
import { PasswordStrengthMeter } from '@/components/auth/password-strength-meter';
import { Alert } from '@/components/feedback/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/forms/form';
import { PasswordInput } from '@/components/forms/input';
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
import { AuthRepository } from '@/features/auth/repository';
import { AppApiError } from '@/lib/api-error';
import { passwordSchema } from '@/schemas/common';

const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const watchPassword = useWatch({ control: form.control, name: 'password' });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      setErrorMsg('Invalid or missing reset token. Please request a new password reset link.');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    try {
      await AuthRepository.resetPassword(token, data.password);
      setIsSuccess(true);
      // Redirect to login after short delay
      setTimeout(() => {
        router.push(ROUTES.auth.login);
      }, 2500);
    } catch (err) {
      if (err instanceof AppApiError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg(
          'Failed to reset password. The link may have expired. Please request a new one.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Missing token — show error immediately
  if (!token) {
    return (
      <div className="w-full max-w-md p-4">
        <Card variant="raised" className="border-border shadow-neo-2">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Invalid Reset Link</CardTitle>
            <CardDescription>This password reset link is invalid or has expired.</CardDescription>
          </CardHeader>
          <CardBody>
            <Alert variant="danger" title="Invalid Link">
              Please request a new password reset link.
            </Alert>
            <div className="mt-4">
              <Link href={ROUTES.auth.forgotPassword} className="w-full">
                <Button variant="primary" size="lg" fullWidth>
                  Request New Link
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

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
            <Icon icon={isSuccess ? CheckCircle2 : Lock} size={24} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isSuccess ? 'Password reset complete' : 'Set new password'}
          </CardTitle>
          <CardDescription>
            {isSuccess
              ? 'Your password has been successfully reset. Redirecting to sign in...'
              : 'Please enter a strong new password for your account.'}
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

          {isSuccess ? (
            <div className="flex flex-col gap-4 py-2 text-center">
              <Alert variant="success" title="Success">
                Your password has been updated. Redirecting to sign in...
              </Alert>
              <Link href={ROUTES.auth.login} className="w-full">
                <Button variant="primary" size="lg" fullWidth>
                  Sign In with New Password
                </Button>
              </Link>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="••••••••"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <PasswordStrengthMeter password={watchPassword} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="••••••••"
                          autoComplete="new-password"
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
                  loadingText="Resetting password..."
                  className="mt-2"
                >
                  Reset Password
                </Button>
              </form>
            </Form>
          )}
        </CardBody>

        <CardFooter className="justify-center border-t border-border/40 pt-4 text-center text-sm text-muted-foreground">
          <Link href={ROUTES.auth.login} className="font-semibold text-primary hover:underline">
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <GuestRoute>
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </GuestRoute>
  );
}
