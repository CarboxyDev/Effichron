'use client';

import { Icon } from '@iconify/react';

export const IconifyIcon = (props: { icon: string; className: string }) => {
  const { icon, className } = props;
  return (
    <>
      <Icon icon={icon} className={className}></Icon>
    </>
  );
};
