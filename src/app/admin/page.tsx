'use client';

import { PageWrapper } from '@/components/PageWrapper';
import { useSearchParams } from 'next/navigation';
import {
  SessionLogCountCard,
  TaskCountCard,
  UserCountCard,
} from './components';

/**
 * This page should only be accessible by the administrator using a secret password
 */

export default function AdminPage() {
  const searchParams = useSearchParams();
  const password = searchParams.get('password');

  return (
    <PageWrapper navbarProps={{ variant: 'with-branding', drawDivider: true }}>
      <div className="mt-12 md:mt-32">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          <UserCountCard password={password} />
          <TaskCountCard password={password} />
          <SessionLogCountCard password={password} />
        </div>
      </div>
    </PageWrapper>
  );
}
