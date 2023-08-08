'use client';

import { CONFIG } from '@/lib/config';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { LoadingSpinner } from './Loading';
import { BetaBadge } from './Other';

interface ProfileDropdownMenuProps {
  setUserIsSigningOut: Dispatch<SetStateAction<boolean>>;
}

const ProfileDropdownMenu = (props: ProfileDropdownMenuProps) => {
  const { setUserIsSigningOut } = props;

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        sideOffset={12}
        collisionPadding={16}
        className="flex min-w-[120px] flex-col rounded-lg border border-zinc-800 bg-zinc-900 text-sm shadow-2xl"
      >
        <Link href={'/timer'}>
          <DropdownMenu.Item className="flex flex-row items-center gap-x-2 rounded-t-lg pb-3 pl-3 pt-4 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-zinc-800 hover:outline-none">
            <Icon
              icon="ic:round-timer"
              className="h-5 w-5 text-zinc-400"
            ></Icon>
            <div className="text-zinc-300">Timer</div>
          </DropdownMenu.Item>
        </Link>
        <Link href={'/tasks'}>
          <DropdownMenu.Item className="flex flex-row items-center gap-x-2 py-3 pl-3 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-zinc-800 hover:outline-none">
            <Icon icon="ic:round-task" className="h-5 w-5 text-zinc-400"></Icon>
            <div className="text-zinc-300">Tasks</div>
          </DropdownMenu.Item>
        </Link>
        <Link href={'/history'}>
          <DropdownMenu.Item className="flex flex-row items-center gap-x-2 py-3 pl-3 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-zinc-800 hover:outline-none">
            <Icon icon="mdi:history" className="h-5 w-5 text-zinc-400"></Icon>
            <div className="text-zinc-300">History</div>
          </DropdownMenu.Item>
        </Link>
        <DropdownMenu.Item
          onClick={async () => {
            signOut({ callbackUrl: '/signout' });
            setUserIsSigningOut(true);
          }}
          className="flex flex-row items-center gap-x-2 rounded-b-lg pb-4 pl-3 pt-3 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-zinc-800 hover:outline-none"
        >
          <Icon icon="mdi:sign-out" className="h-5 w-5 text-zinc-600"></Icon>
          <div className="text-zinc-500">Sign out</div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
};

type userSessionStatus = 'authenticated' | 'loading' | 'unauthenticated';

interface NavbarProps {
  variant?: 'with-branding';
  userSession?: {
    session: Session | null;
    status: userSessionStatus;
  };
}

const Navbar = (props: NavbarProps) => {
  const { variant } = props;
  const { data: session, status } = useSession();

  const [userIsSigningOut, setUserIsSigningOut] = useState(false);

  return (
    <>
      <div className="flex w-full select-none flex-row items-center px-4 py-4">
        {variant === 'with-branding' && (
          <Link href="/">
            <h2 className="text-md font-semibold text-zinc-200 md:text-lg">
              Productivity Tracker <BetaBadge />
            </h2>
          </Link>
        )}
        <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 hover:cursor-pointer">
          {status === 'unauthenticated' && (
            <Link href={CONFIG.SIGN_IN_URL}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full">
                <Icon
                  icon="ep:user-filled"
                  className={cn('h-5 w-5 text-zinc-400')}
                />
              </div>
            </Link>
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
              <ProfileDropdownMenu setUserIsSigningOut={setUserIsSigningOut} />
            </DropdownMenu.Root>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
