'use client';

import { PageWrapper } from '@/components/PageWrapper';
import { CTA } from '@/components/home/CTA';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';

export default function HomePage() {
  return (
    <PageWrapper navbarProps={{ variant: 'with-branding', drawDivider: true }}>
      <div className="mt-24 md:mt-40"></div>
      <HeroSection />
      <div className="mt-60 md:mt-100"></div>
      <HowItWorksSection />
      <div className="mt-40 md:mt-60"></div>
      <div className="mb-20 h-px bg-dark-900"></div>
      <CTA />
      <div className="mt-20 h-px bg-dark-900"></div>
    </PageWrapper>
  );
}
