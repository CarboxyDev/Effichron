import { PageWrapper } from '@/components/PageWrapper';
import { SessionHistoryContainer } from './components';

export default function HistoryPage() {
  return (
    <PageWrapper
      navbarProps={{ variant: 'with-minimal-branding', drawDivider: true }}
    >
      <div className="mt-14">
        <h2 className="mb-20 text-3xl font-semibold text-dark-200 md:mb-32 md:text-4xl">
          Sessions History
        </h2>
        <div className="flex items-center justify-center">
          <SessionHistoryContainer />
        </div>
      </div>
    </PageWrapper>
  );
}
