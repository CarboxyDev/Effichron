import { FullWidthContainer, PageWrapper } from '@/components/PageWrapper';
import { CTA } from '@/components/home/CTA';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';

export default function HomePage() {
  return (
    <PageWrapper navbarProps={{ variant: 'with-branding', drawDivider: true }}>
      <div className="mt-24 md:mt-40"></div>
      <HeroSection />
      <div className="mt-60 md:mt-72"></div>
      <HowItWorksSection />
      <div className="mt-40 md:mt-60"></div>
      <FullWidthContainer>
        <div className="h-px bg-dark-900"></div>
      </FullWidthContainer>
      <CTA />
      <FullWidthContainer>
        <div className="h-px bg-dark-900"></div>
      </FullWidthContainer>
      <div className="mt-60 md:mt-72"></div>
      <FeaturesSection />
    </PageWrapper>
  );
}
