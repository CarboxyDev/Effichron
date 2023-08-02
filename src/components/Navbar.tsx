'use client';

import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const ProfileDropdownMenu = (): JSX.Element => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        sideOffset={12}
        collisionPadding={16}
        className="flex min-w-[120px] flex-col rounded-lg border border-zinc-800 bg-zinc-900 text-sm shadow-2xl"
      >
        <Link href={'/'}>
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
        <Link href={'/api/auth/signout'}>
          <DropdownMenu.Item className="flex flex-row items-center gap-x-2 rounded-b-lg pb-4 pl-3 pt-3 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-zinc-800 hover:outline-none">
            <Icon icon="mdi:sign-out" className="h-5 w-5 text-zinc-600"></Icon>
            <div className="text-zinc-500">Sign out</div>
          </DropdownMenu.Item>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
};

interface NavbarProps {
  variant?: 'with-branding';
}

const Navbar = (props: NavbarProps) => {
  const variant = props.variant;
  const { data: session, status } = useSession();

  return (
    <>
      <div className="flex w-full select-none flex-row items-center px-4 py-4">
        {variant === 'with-branding' && (
          <div>
            <h2 className="text-lg font-semibold text-zinc-200">
              Productivity Tracker
            </h2>
          </div>
        )}
        <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 hover:cursor-pointer">
          {status === 'unauthenticated' && (
            <Link href="/api/auth/signin">
              <Icon
                icon="ep:user-filled"
                className={cn('h-5 w-5 text-zinc-400')}
              />
            </Link>
          )}
          {status === 'loading' && <></>}
          {status === 'authenticated' && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Image
                  width={40}
                  height={40}
                  src={session.user?.image || ''}
                  alt={'pfp'}
                  className="h-full w-full rounded-full"
                />
              </DropdownMenu.Trigger>
              <ProfileDropdownMenu />
            </DropdownMenu.Root>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
