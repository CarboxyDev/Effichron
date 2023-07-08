'use client';

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
        className="rounded-lg bg-zinc-900 px-5 py-5 shadow-2xl"
      >
        <Link href={'/'}>
          <DropdownMenu.Item className="mb-2 rounded-md px-2 py-1 text-zinc-300 hover:cursor-pointer hover:bg-zinc-700 hover:outline-none">
            Home
          </DropdownMenu.Item>
        </Link>
        <Link href={'/tasks'}>
          <DropdownMenu.Item className="mb-2 rounded-md px-2 py-1 text-zinc-300 hover:cursor-pointer hover:bg-zinc-700 hover:outline-none">
            My tasks
          </DropdownMenu.Item>
        </Link>
        <Link href={'/profile'}>
          <DropdownMenu.Item className="mb-2 rounded-md px-2 py-1 text-zinc-300 hover:cursor-pointer hover:bg-zinc-700 hover:outline-none">
            Profile
          </DropdownMenu.Item>
        </Link>
        <Link href={'/history'}>
          <DropdownMenu.Item className="mb-2 rounded-md px-2 py-1 text-zinc-300 hover:cursor-pointer hover:bg-zinc-700 hover:outline-none">
            Sessions history
          </DropdownMenu.Item>
        </Link>
        <Link href={'/api/auth/signout'}>
          <DropdownMenu.Item className="mb-2 rounded-md px-2 py-1 text-zinc-300 hover:cursor-pointer hover:bg-zinc-700 hover:outline-none">
            Sign out
          </DropdownMenu.Item>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
};

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="flex w-full flex-row px-4 py-4">
        <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 hover:cursor-pointer">
          {status != 'authenticated' && (
            <Link href={'/api/auth/signin'}>
              <Icon icon="ep:user-filled" className="h-5 w-5 text-zinc-400" />
            </Link>
          )}
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
