'use client';

import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Icon } from '@/design-system/components/icon';
import { motion } from 'framer-motion';

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.71c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.81 1.44-.61.71-1.15 1.85-.99 2.95 1.07.08 2.15-.55 2.81-1.35z" />
    </svg>
  );
}

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734c0-.39.227-.74.609-.92zm11.602 8.769l2.492-2.492-12.72-7.344 10.228 9.836zM4.983 23.253l12.72-7.344-2.492-2.492-10.228 9.836zm14.77-10.375l2.766-1.597a1 1 0 0 0 0-1.732l-2.766-1.597-2.88 2.88 2.88 2.88z" />
    </svg>
  );
}

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-12 pb-20 sm:pt-20 sm:pb-32">
      {/* Decorative Gradient Background Spheres */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-accent/15 to-transparent opacity-60 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          {/* Release Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2"
          >
            <Badge
              variant="secondary"
              className="border-border px-3 py-1 text-xs font-semibold shadow-neo-1"
            >
              <Icon icon={Sparkles} size={14} className="mr-1 inline text-primary" />
              <span>Production Integration Live v2.0</span>
            </Badge>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl leading-tight font-black tracking-tight text-foreground sm:text-6xl"
          >
            Split Bills Effortlessly.{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Settle Debts Instantly.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Splitmate calculates exact debt minimizations for trips, roommate rent, and group
            dinners. Supports 4 split types, multi-currency conversion, and real-time backend
            synchronization.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row"
          >
            <Link href={ROUTES.auth.register} className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<Icon icon={ArrowRight} size={18} />}
                className="px-8 py-3 text-base shadow-neo-2"
              >
                Get Started Free
              </Button>
            </Link>
            <a href="#demo" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" fullWidth className="px-8 py-3 text-base">
                Try Interactive Demo
              </Button>
            </a>
          </motion.div>

          {/* App Store Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <a
              href="#mobile-app"
              className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground shadow-neo-1 transition-all hover:bg-accent"
            >
              <AppleIcon className="h-4 w-4 shrink-0 text-foreground" />
              <span>App Store</span>
            </a>
            <a
              href="#mobile-app"
              className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground shadow-neo-1 transition-all hover:bg-accent"
            >
              <PlayStoreIcon className="h-4 w-4 shrink-0 text-foreground" />
              <span>Google Play</span>
            </a>
          </motion.div>

          {/* Value Props Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <Icon icon={CheckCircle2} size={16} className="text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon icon={Zap} size={16} className="text-primary" />
              <span>Instant debt minimization</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon icon={ShieldCheck} size={16} className="text-accent" />
              <span>Enterprise API & real-time sync</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Preview Graphics Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative mx-auto mt-12 max-w-5xl sm:mt-16"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface-raised p-2 shadow-neo-4 sm:p-4">
            <Image
              src="/hero_app_preview.jpg"
              alt="Splitmate Application Interface Preview"
              width={1200}
              height={675}
              priority
              className="shadow-neo-inner w-full rounded-xl object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
