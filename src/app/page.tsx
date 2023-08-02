'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Toaster position="top-left" />
      <Navbar variant="with-branding" />
      <div className="mx-4 mt-6 h-px w-full bg-zinc-900"></div>
      <div className="mx-20 mt-40">
        <div className="flex flex-row">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-semibold text-zinc-200">
              The secret recipe for a more{' '}
              <span className="magic-text">productive you ✨</span>
            </h1>
            <p className="mt-8 text-lg leading-8 text-zinc-400">
              Conveniently track your personal tasks and the time you spend on
              them to figure out your main time wasters.
            </p>
            <Link href="/timer">
              <button className="mt-20 rounded-lg bg-purple-500 px-8 py-3 text-lg font-medium transition delay-200 duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-purple-500/90 active:scale-95">
                Get started
              </button>
            </Link>
          </div>
          <div></div>
        </div>
      </div>
      <div className="mx-4 mt-100 h-px w-full bg-zinc-900"></div>
      <footer className="w-full">
        <div className="mx-auto my-10 flex w-fit flex-col items-center">
          <p className="text-zinc-200">
            Productivity Tracker{' '}
            <span className="ml-4 rounded-[4px] bg-emerald-500 px-3 py-1 text-xs font-semibold">
              BETA
            </span>
          </p>
          <p className="mt-6 font-light text-zinc-500">
            © 2023 CarboxyDev . All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
