'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { GuestRoute } from '@/components/auth/guest-route';
import { PasswordStrengthMeter } from '@/components/auth/password-strength-meter';
import { Alert } from '@/components/feedback/alert';
import { Checkbox } from '@/components/forms/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/forms/form';
import { Input, PasswordInput } from '@/components/forms/input';
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
import { registerSchema, type RegisterInput } from '@/features/auth/schemas/auth.schema';
import { AppApiError } from '@/lib/api-error';

export default function RegisterPage() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const watchPassword = useWatch({ control: form.control, name: 'password' });

  const onSubmit = async (data: RegisterInput) => {
    if (!agreedTerms) {
      setErrorMsg('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      await AuthRepository.register(data);
      setSuccessMsg('Account created! Please check your email to verify your account.');
      setTimeout(() => {
        router.push(`${ROUTES.auth.verifyEmailPending}?email=${encodeURIComponent(data.email)}`);
      }, 1500);
    } catch (err) {
      if (err instanceof AppApiError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GuestRoute>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-4"
      >
        <Card variant="raised" className="border-border shadow-neo-2">
          <CardHeader className="pb-2 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-neo-1">
              <Icon icon={User} size={24} />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Create your account</CardTitle>
            <CardDescription>
              Join Splitmate to effortlessly share expenses with friends
            </CardDescription>
          </CardHeader>

          <CardBody>
            {errorMsg && (
              <div className="mb-4">
                <Alert variant="danger" title="Registration Error">
                  {errorMsg}
                </Alert>
              </div>
            )}

            {successMsg && (
              <div className="mb-4">
                <Alert
                  variant="success"
                  title="Account Created"
                  icon={<Icon icon={CheckCircle2} size={18} />}
                >
                  {successMsg}
                </Alert>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Alex Morgan"
                          prefixIcon={<Icon icon={User} size={18} />}
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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

                <PasswordStrengthMeter password={watchPassword || ''} />

                <div className="flex items-start gap-2 pt-1">
                  <Checkbox
                    id="terms"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    label={
                      <span className="text-xs text-muted-foreground">
                        I agree to the{' '}
                        <Link href="/terms" className="text-primary underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary underline">
                          Privacy Policy
                        </Link>
                      </span>
                    }
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                  loadingText="Creating account..."
                  rightIcon={<Icon icon={ArrowRight} size={18} />}
                  className="mt-2"
                >
                  Create Account
                </Button>
              </form>
            </Form>
          </CardBody>

          <CardFooter className="justify-center border-t border-border/40 pt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href={ROUTES.auth.login}
              className="ml-1 font-semibold text-primary hover:underline"
            >
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </GuestRoute>
  );
}
