'use client';

import { IconifyIcon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { PageWrapper } from '@/components/PageWrapper';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const SignInItem = (props: {
  brand: string;
  iconName: string;
  text: string;
}) => {
  const { brand, iconName, text } = props;

  return (
    <>
      <div
        className="flex select-none flex-row items-center gap-x-3 rounded-lg border border-dark-800 px-4 py-3 transition delay-200 duration-300 ease-in-out hover:cursor-pointer hover:border-dark-700 hover:bg-dark-800 md:px-8"
        onClick={() => signIn(brand)}
      >
        <IconifyIcon icon={iconName} className="h-10 w-10 text-dark-300" />
        <span className="text-lg text-dark-300">{text}</span>
      </div>
    </>
  );
};

export default function SignInPage() {
  const searchParams = useSearchParams();
  const nextAuthError = searchParams.get('error');

  return (
    <PageWrapper navbarProps={null}>
      <div className="mt-50 flex flex-col items-center">
        <Link href="/">
          <Logo size={120} />
        </Link>
        <div className="mt-20 flex flex-col items-center rounded-xl border border-dark-700 bg-dark-900 px-6 py-8 md:px-12 md:py-12">
          <h2 className="text-lg text-dark-400">Sign in with</h2>
          <div className="mt-12">
            <div className="flex flex-row gap-x-4 md:gap-x-8">
              <SignInItem brand="github" iconName="mdi:github" text="Github" />
              <SignInItem
                brand="discord"
                iconName="ic:baseline-discord"
                text="Discord"
              />
            </div>
            <div className="mt-4 flex justify-center md:mt-8">
              <SignInItem
                brand="google"
                iconName="ri:google-fill"
                text="Google"
              />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
