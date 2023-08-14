import { PageWrapper } from '@/components/PageWrapper';

/**
 * This page should only be accessible by the administrator
 */

export default function AdminPage() {
  return (
    <PageWrapper navbarProps={{ variant: 'with-branding', drawDivider: true }}>
      <div className="mt-14"></div>
    </PageWrapper>
  );
}
