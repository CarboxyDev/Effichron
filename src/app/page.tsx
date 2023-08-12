'use client';

import { PageWrapper } from '@/components/PageWrapper';
import { CTA } from '@/components/home/CTA';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { cn } from '@/utils/util';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const headingFont = Poppins({ subsets: ['latin'], weight: ['600'] });

export default function HomePage() {
  return (
    <PageWrapper navbarProps={{ variant: 'with-branding', drawDivider: true }}>
      <div className="mt-24 md:mt-40">
        <div className="md:max-w-2xl">
          <h1
            className={cn(
              headingFont.className,
              'text-3xl font-semibold leading-tight text-dark-100 md:text-[46px]'
            )}
          >
            The secret recipe for a more{' '}
            <span className="magic-text">productive you ✨</span>
          </h1>
          <p className="mt-8 text-base leading-tight text-dark-300 md:text-lg md:leading-8">
            Conveniently track your personal tasks and the time you spend on
            them to figure out your main time wasters.
          </p>
          <Link href="/timer">
            <button className="mt-12 rounded-lg bg-primary-500 px-8 py-3 text-lg font-medium transition delay-200 duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-purple-500/90 active:scale-95 md:mt-20">
              Get started
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-60 md:mt-100"></div>
      <HowItWorksSection />
      <div className="mt-40 md:mt-60"></div>
      <div className="mb-20 h-px bg-dark-900"></div>
      <CTA />
      <div className="mt-20 h-px bg-dark-900"></div>
    </PageWrapper>
  );
}
