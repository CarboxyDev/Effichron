import { cn } from '@/utils/util';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const headingFont = Poppins({ subsets: ['latin'], weight: ['600'] });

export const HeroSection = () => {
  return (
    <>
      <div className="flex flex-row items-center">
        <div className="md:max-w-lg xl:max-w-2xl">
          <h1
            className={cn(
              headingFont.className,
              'text-[28px] font-semibold leading-tight text-dark-100 md:text-[46px]'
            )}
          >
            The secret recipe for a more{' '}
            <span className="magic-text">productive you ✨</span>
          </h1>
          <p className="mt-3 text-lg leading-tight text-dark-300 md:mt-5 md:leading-8 xl:text-xl">
            Conveniently track your personal tasks and the time you spend on
            them to figure out your main time wasters.
          </p>
          <Link href="/timer">
            <button className="mt-8 rounded-md bg-primary-500 px-8 py-3 text-lg font-medium text-white shadow-sm transition delay-200 duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-purple-500/90 active:scale-95 md:mt-12">
              Get started now
            </button>
          </Link>
        </div>
        <div className="ml-auto hidden md:block">
          <Image
            src="/hero-image.png" // Source has ratio 0.8 to 1 (width to height)
            alt="Graphic"
            height={500}
            width={400}
            className=""
          />
        </div>
      </div>
    </>
  );
};
