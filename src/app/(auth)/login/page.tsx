'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';

import { GuestRoute } from '@/components/auth/guest-route';
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
import { loginSchema, type LoginInput } from '@/features/auth/schemas/auth.schema';
import { AppApiError } from '@/lib/api-error';
import { useSession } from '@/lib/context/session-context';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') ?? ROUTES.dashboard.overview;
  const { login } = useSession();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const response = await AuthRepository.login(data);
      // Update SessionContext so ProtectedRoute guards open immediately
      login(response.user, response.accessToken, response.refreshToken);
      router.push(returnUrl);
    } catch (err) {
      if (err instanceof AppApiError) {
        // 403 EMAIL_NOT_VERIFIED — redirect to pending verification page
        if (err.status === 403) {
          router.push(`${ROUTES.auth.verifyEmailPending}?email=${encodeURIComponent(data.email)}`);
          return;
        }
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Invalid email or password. Please try again.');
      }
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
            <Icon icon={Lock} size={24} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Sign in to your Splitmate account to continue</CardDescription>
        </CardHeader>

        <CardBody>
          {errorMsg && (
            <div className="mb-4">
              <Alert variant="danger" title="Authentication Error">
                {errorMsg}
              </Alert>
            </div>
          )}

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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href={ROUTES.auth.forgotPassword}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between pt-1">
                <Checkbox id="remember-me" label="Remember me" />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                loadingText="Signing in..."
                rightIcon={<Icon icon={ArrowRight} size={18} />}
                className="mt-2"
              >
                Sign In
              </Button>
            </form>
          </Form>
        </CardBody>

        <CardFooter className="justify-center border-t border-border/40 pt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href={ROUTES.auth.register}
            className="ml-1 font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <GuestRoute>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </GuestRoute>
  );
}
