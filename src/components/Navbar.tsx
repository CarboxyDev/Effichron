'use client';

import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log('Checking if user is logged in');

  return (
    <>
      <div className="flex w-full flex-row px-4 py-4">
        <div className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-700 hover:cursor-pointer">
          {status != 'unauthenticated' && (
            <Icon icon="ep:user-filled" className="h-7 w-7 text-zinc-800" />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
