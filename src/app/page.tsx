'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { cn } from '@/utils/util';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

const headingFont = Poppins({ subsets: ['latin'], weight: ['600'] });

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Toaster position="top-left" />
      <Navbar variant="with-branding" />
      <div className="mx-4 mt-2 h-px bg-zinc-900 md:mt-6"></div>
      <div className="mx-10 mt-24 md:mx-20 md:mt-40">
        <div className="flex flex-row">
          <div className="md:max-w-2xl">
            <h1
              className={cn(
                headingFont.className,
                'text-3xl font-semibold leading-tight text-zinc-100 md:text-[46px]'
              )}
            >
              The secret recipe for a more{' '}
              <span className="magic-text">productive you ✨</span>
            </h1>
            <p className="mt-8 text-base leading-tight text-zinc-300 md:text-lg md:leading-8">
              Conveniently track your personal tasks and the time you spend on
              them to figure out your main time wasters.
            </p>
            <Link href="/timer">
              <button className="mt-12 rounded-lg bg-purple-500 px-8 py-3 text-lg font-medium transition delay-200 duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-purple-500/90 active:scale-95 md:mt-20">
                Get started
              </button>
            </Link>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
