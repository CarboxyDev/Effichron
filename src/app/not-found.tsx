import { Logo } from '@/components/Logo';
import { PageWrapper } from '@/components/PageWrapper';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <PageWrapper navbarProps={null}>
      <div className="mt-50 flex flex-col items-center lg:mt-72">
        <Link href="/">
          <Logo size={120} hoverAnimation={true} />
        </Link>
        <div className="mb-6 md:mb-8">
          <h2 className="mt-20 text-4xl font-semibold text-zinc-200 md:mt-24 md:text-5xl">
            Page not found
          </h2>
        </div>
        <Link href="/">
          <button className="rounded-md bg-primary-500 px-6 py-2 text-lg text-white shadow-sm transition delay-200 duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-purple-500/90 active:scale-95">
            Back to home
          </button>
        </Link>
      </div>
    </PageWrapper>
  );
}
