'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

import { Alert } from '@/components/feedback/alert';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { AuthRepository } from '@/features/auth/repository';
import { AppApiError } from '@/lib/api-error';

type Status = 'verifying' | 'success' | 'error';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<Status>(token ? 'verifying' : 'error');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token || hasVerified.current) return;
    hasVerified.current = true;

    const verify = async () => {
      try {
        await AuthRepository.verifyEmail(token);
        setStatus('success');
        // Auto-redirect to login after 3 seconds
        setTimeout(() => {
          router.push(`${ROUTES.auth.login}?verified=true`);
        }, 3000);
      } catch (err) {
        setStatus('error');
        if (err instanceof AppApiError) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg(
            'This verification link is invalid or has expired. Please request a new one.',
          );
        }
      }
    };

    verify();
  }, [token, router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md p-4"
    >
      <Card variant="raised" className="border-border shadow-neo-2">
        <CardHeader className="pb-2 text-center">
          <div
            className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl shadow-neo-1 ${
              status === 'success'
                ? 'bg-success text-success-foreground'
                : status === 'error'
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-primary text-primary-foreground'
            }`}
          >
            {status === 'verifying' && <Icon icon={Loader2} size={24} className="animate-spin" />}
            {status === 'success' && <Icon icon={CheckCircle2} size={24} />}
            {status === 'error' && <Icon icon={AlertCircle} size={24} />}
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            {status === 'verifying' && 'Verifying your email...'}
            {status === 'success' && 'Email verified!'}
            {status === 'error' && 'Verification failed'}
          </CardTitle>

          <CardDescription>
            {status === 'verifying' && 'Please wait while we verify your email address.'}
            {status === 'success' &&
              "Your email has been verified successfully. You'll be redirected to sign in automatically."}
            {status === 'error' && (errorMsg || 'Something went wrong. Please try again.')}
          </CardDescription>
        </CardHeader>

        <CardBody className="space-y-3">
          {status === 'success' && (
            <Alert variant="success" title="Verification Complete">
              Your account is now active. Redirecting to sign in in 3 seconds...
            </Alert>
          )}

          {status === 'error' && (
            <>
              {errorMsg && (
                <Alert variant="danger" title="Verification Error">
                  {errorMsg}
                </Alert>
              )}
              <div className="flex flex-col gap-2 pt-2">
                <Link href={ROUTES.auth.verifyEmailPending}>
                  <Button variant="primary" size="lg" fullWidth>
                    Request New Verification Email
                  </Button>
                </Link>
                <Link href={ROUTES.auth.login}>
                  <Button variant="outline" size="lg" fullWidth>
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </>
          )}

          {status === 'success' && (
            <Link href={ROUTES.auth.login}>
              <Button variant="primary" size="lg" fullWidth>
                Sign In Now
              </Button>
            </Link>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
