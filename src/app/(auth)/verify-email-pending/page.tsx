'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MailCheck, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

import { Alert } from '@/components/feedback/alert';
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

function VerifyEmailPendingContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  const handleResend = async () => {
    setIsResending(true);
    setResendSuccess(false);
    setResendError(null);
    try {
      // POST /auth/resend-verification — always returns 200
      if (email) {
        await AuthRepository.resendVerification(email);
      } else {
        // No email in params — still show success (don't reveal)
      }
      setResendSuccess(true);
    } catch (err) {
      if (err instanceof AppApiError) {
        setResendError(err.message);
      }
      // API always returns 200 — treat errors as success (security)
      setResendSuccess(true);
    } finally {
      setIsResending(false);
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
            <Icon icon={MailCheck} size={24} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Verify your email</CardTitle>
          <CardDescription>
            {email ? (
              <>
                We sent a verification link to{' '}
                <span className="font-semibold text-foreground">{email}</span>. Click the link in
                the email to verify your account before signing in.
              </>
            ) : (
              'We sent a verification link to your email address. Please click the link to verify your account.'
            )}
          </CardDescription>
        </CardHeader>

        <CardBody className="space-y-4">
          {resendSuccess && (
            <Alert variant="success" title="Email Resent">
              A new verification link has been sent to your inbox.
            </Alert>
          )}

          {resendError && (
            <Alert variant="danger" title="Resend Failed">
              {resendError}
            </Alert>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              isLoading={isResending}
              loadingText="Resending link..."
              leftIcon={<Icon icon={RefreshCw} size={18} />}
              onClick={handleResend}
            >
              Resend Verification Link
            </Button>

            <Link href={ROUTES.auth.login} className="w-full">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<Icon icon={ArrowRight} size={18} />}
              >
                Go to Sign In
              </Button>
            </Link>
          </div>
        </CardBody>

        <CardFooter className="justify-center border-t border-border/40 pt-4 text-center text-sm text-muted-foreground">
          Wrong email?{' '}
          <Link
            href={ROUTES.auth.register}
            className="ml-1 font-semibold text-primary hover:underline"
          >
            Create a new account
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function VerifyEmailPendingPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailPendingContent />
    </Suspense>
  );
}
