'use client';

import { LandingAppDownload } from '@/components/landing/landing-app-download';
import { LandingCalculator } from '@/components/landing/landing-calculator';
import { LandingFAQ } from '@/components/landing/landing-faq';
import { LandingFeatures } from '@/components/landing/landing-features';
import { LandingFooter } from '@/components/landing/landing-footer';
import { LandingHero } from '@/components/landing/landing-hero';
import { LandingHowItWorks } from '@/components/landing/landing-how-it-works';
import { LandingNav } from '@/components/landing/landing-nav';
import { LandingPricing } from '@/components/landing/landing-pricing';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Header Navigation */}
      <LandingNav />

      {/* Main Content */}
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingCalculator />
        <LandingHowItWorks />
        <LandingPricing />
        <LandingAppDownload />
        <LandingFAQ />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
