'use client';

import { SessionProvider } from 'next-auth/react';

const Providers = (props: React.PropsWithChildren) => {
  const children = props.children;

  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
