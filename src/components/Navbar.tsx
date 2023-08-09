'use client';

import { CONFIG } from '@/lib/config';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LoadingSpinner } from './Loading';
import { BetaBadge } from './Other';

interface ProfileDropdownMenuProps {
  setUserIsSigningOut: Dispatch<SetStateAction<boolean>>;
  userIsSignedIn: boolean;
}

const ProfileDropdownMenu = (props: ProfileDropdownMenuProps) => {
  const { setUserIsSigningOut, userIsSignedIn } = props;
  const router = useRouter();
  const [redirectUser, setRedirectUser] = useState(false);

  useEffect(() => {
    if (redirectUser) {
      redirect(CONFIG.SIGN_IN_URL);
    }
  }, [router, redirectUser]);

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        sideOffset={12}
        collisionPadding={16}
        className="flex min-w-[120px] flex-col rounded-lg border border-dark-800 bg-dark-900 text-sm shadow-2xl"
      >
        <Link href={'/timer'}>
          <DropdownMenu.Item className="flex flex-row items-center gap-x-2 rounded-t-lg pb-3 pl-3 pt-4 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-dark-800 hover:outline-none">
            <Icon
              icon="ic:round-timer"
              className="h-5 w-5 text-dark-400"
            ></Icon>
            <div className="text-dark-300">Timer</div>
          </DropdownMenu.Item>
        </Link>
        <Link href={'/tasks'}>
          <DropdownMenu.Item className="flex flex-row items-center gap-x-2 py-3 pl-3 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-dark-800 hover:outline-none">
            <Icon icon="ic:round-task" className="h-5 w-5 text-dark-400"></Icon>
            <div className="text-dark-300">Tasks</div>
          </DropdownMenu.Item>
        </Link>
        <Link href={'/history'}>
          <DropdownMenu.Item className="flex flex-row items-center gap-x-2 py-3 pl-3 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-dark-800 hover:outline-none">
            <Icon icon="mdi:history" className="h-5 w-5 text-dark-400"></Icon>
            <div className="text-dark-300">History</div>
          </DropdownMenu.Item>
        </Link>
        {userIsSignedIn && (
          <DropdownMenu.Item
            onClick={async () => {
              signOut({ callbackUrl: '/signout' });
              setUserIsSigningOut(true);
            }}
            className="flex flex-row items-center gap-x-2 rounded-b-lg pb-4 pl-3 pt-3 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-dark-800 hover:outline-none"
          >
            <Icon icon="mdi:sign-out" className="h-5 w-5 text-dark-600"></Icon>
            <div className="text-dark-500">Sign out</div>
          </DropdownMenu.Item>
        )}
        {!userIsSignedIn && (
          <DropdownMenu.Item
            onClick={async () => {
              setRedirectUser(true);
            }}
            className="flex flex-row items-center gap-x-2 rounded-b-lg pb-4 pl-3 pt-3 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-dark-800 hover:outline-none"
          >
            <Icon icon="mdi:sign-in" className="h-5 w-5 text-dark-300"></Icon>
            <div className="text-dark-300">Sign in</div>
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
};

type userSessionStatus = 'authenticated' | 'loading' | 'unauthenticated';
export type NavbarVariants = 'with-branding' | 'with-minimal-branding';

interface NavbarProps {
  variant?: NavbarVariants;
  drawDivider?: boolean;
  userSession?: {
    session: Session | null;
    status: userSessionStatus;
  };
}

const Navbar = (props: NavbarProps) => {
  const { variant, drawDivider } = props;
  const { data: session, status } = useSession();

  const [userIsSigningOut, setUserIsSigningOut] = useState(false);

  return (
    <>
      <div className="mt-4 flex w-full select-none flex-row items-center">
        {variant === 'with-branding' && (
          <Link href="/">
            <h2 className="text-md font-semibold text-dark-200 md:text-lg">
              <Image
                height={36}
                width={36}
                className="mr-1 inline"
                src={'/logo.png'}
                alt={'logo'}
              />{' '}
              Effichron <BetaBadge />
            </h2>
          </Link>
        )}
        {variant === 'with-minimal-branding' && (
          <Link href="/">
            <Image
              height={36}
              width={36}
              className="inline"
              src={'/logo.png'}
              alt={'logo'}
            />
          </Link>
        )}
        <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-dark-900 hover:cursor-pointer">
          {status === 'unauthenticated' && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="focus:outline-none">
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  <Icon
                    icon="ep:user-filled"
                    className={cn('h-5 w-5 text-dark-400')}
                  />
                </div>
              </DropdownMenu.Trigger>{' '}
              <ProfileDropdownMenu
                userIsSignedIn={false}
                setUserIsSigningOut={setUserIsSigningOut}
              />
            </DropdownMenu.Root>
          )}
          {status === 'loading' && <></>}
          {status === 'authenticated' && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="focus:outline-none">
                {!userIsSigningOut && (
                  <Image
                    width={40}
                    height={40}
                    src={session.user?.image || ''}
                    alt={'pfp'}
                    className="h-full w-full rounded-full"
                  />
                )}
                {userIsSigningOut && (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size={40} />
                  </div>
                )}
              </DropdownMenu.Trigger>
              <ProfileDropdownMenu
                userIsSignedIn={true}
                setUserIsSigningOut={setUserIsSigningOut}
              />
            </DropdownMenu.Root>
          )}
        </div>
      </div>
      {drawDivider && <div className="mt-4 h-px bg-dark-900 md:mt-8"></div>}
    </>
  );
};

export default Navbar;
