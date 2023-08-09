import { PageWrapper } from '@/components/PageWrapper';
import { TaskListView } from './components';

export default function TasksPage() {
  return (
    <PageWrapper
      navbarProps={{ variant: 'with-minimal-branding', drawDivider: true }}
    >
      <div className="mt-14">
        <h2 className="mb-20 text-3xl font-semibold text-dark-200 md:mb-32 md:text-4xl">
          My Tasks
        </h2>
        <div className="mt-6 flex flex-col items-center gap-y-3 md:mt-12">
          <TaskListView />
        </div>
      </div>
    </PageWrapper>
  );
}
