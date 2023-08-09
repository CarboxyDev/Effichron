import { PageWrapper } from '@/components/PageWrapper';
import { SessionHistoryContainer } from './components';

export default function HistoryPage() {
  return (
    <PageWrapper
      navbarProps={{ variant: 'with-minimal-branding', drawDivider: false }}
    >
      <div className="mt-14">
        <h2 className="text-3xl font-semibold text-zinc-200 md:text-4xl">
          Sessions History
        </h2>
        <div className="mb-25 mt-6 h-px bg-zinc-900 md:mt-12"></div>
        <div className="flex items-center justify-center">
          <SessionHistoryContainer />
        </div>
      </div>
    </PageWrapper>
  );
}
