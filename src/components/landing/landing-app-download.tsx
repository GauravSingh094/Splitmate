'use client';

import { Check, QrCode, Smartphone, Star } from 'lucide-react';
import React from 'react';

import { Card } from '@/components/ui/card';
import { Icon } from '@/design-system/components/icon';

// SVG Icons for Apple App Store & Google Play Store
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

export function LandingAppDownload() {
  return (
    <section
      id="mobile-app"
      className="relative overflow-hidden border-t border-border/40 bg-background py-20"
    >
      {/* Background Decorative Lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card
          variant="raised"
          className="relative overflow-hidden border-border bg-surface-raised p-8 shadow-neo-4 sm:p-12"
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Content */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                <Icon icon={Smartphone} size={16} />
                <span>Available on iOS & Android</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Get Splitmate on Your Phone
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Take Splitmate anywhere. Add expenses on the go, scan receipts instantly, receive
                push notifications when friends settle up, and split bills offline.
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 gap-3 pt-2 text-xs font-medium text-foreground sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                    <Icon icon={Check} size={14} />
                  </div>
                  <span>Instant Push Notifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                    <Icon icon={Check} size={14} />
                  </div>
                  <span>Offline Expense Syncing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                    <Icon icon={Check} size={14} />
                  </div>
                  <span>Smart AI Receipt Scanner</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                    <Icon icon={Check} size={14} />
                  </div>
                  <span>Biometric FaceID Login</span>
                </div>
              </div>

              {/* App Store Download Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {/* Apple App Store */}
                <a
                  href="#download-ios"
                  className="flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 font-semibold text-background shadow-neo-2 transition-all hover:scale-102 hover:opacity-90"
                >
                  <AppleIcon className="h-7 w-7 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-3xs font-semibold tracking-wider uppercase opacity-80">
                      Download on the
                    </span>
                    <span className="text-sm font-bold tracking-tight">App Store</span>
                  </div>
                </a>

                {/* Google Play Store */}
                <a
                  href="#download-android"
                  className="flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 font-semibold text-background shadow-neo-2 transition-all hover:scale-102 hover:opacity-90"
                >
                  <PlayStoreIcon className="h-7 w-7 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-3xs font-semibold tracking-wider uppercase opacity-80">
                      GET IT ON
                    </span>
                    <span className="text-sm font-bold tracking-tight">Google Play</span>
                  </div>
                </a>
              </div>

              {/* Social Proof Rating */}
              <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1 font-bold text-amber-500">
                  <Icon icon={Star} size={14} className="fill-amber-500" />
                  <span>4.9 / 5.0</span>
                </div>
                <span>•</span>
                <span>Over 30,000+ downloads on iOS & Android</span>
              </div>
            </div>

            {/* Right Content: QR Code Card */}
            <div className="flex justify-center lg:col-span-5">
              <Card
                variant="surface"
                className="w-full max-w-xs space-y-4 border-border p-6 text-center shadow-neo-3"
              >
                <div className="mx-auto inline-flex rounded-2xl bg-white p-4 text-black shadow-neo-inset">
                  <Icon icon={QrCode} size={48} className="text-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Scan to Download</h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Point your camera to install Splitmate directly on your device.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
