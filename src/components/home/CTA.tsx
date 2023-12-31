import Link from 'next/link';
import { FullWidthContainer } from '../PageWrapper';

export const CTA = () => {
  return (
    <>
      <FullWidthContainer className="bg-gradient-1 flex flex-col items-center justify-center py-20">
        <h3 className="magic-text hidden py-2 text-center text-3xl font-semibold md:block md:text-[46px]">
          Ready to become more productive?
        </h3>
        <div>
          <Link href="/timer">
            <button className="mt-12 rounded-lg bg-primary-500 px-8 py-3 text-lg font-medium transition delay-200 duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-purple-500/90 active:scale-95 md:mt-20">
              I&apos;m ready
            </button>
          </Link>
        </div>
      </FullWidthContainer>
    </>
  );
};
