import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { CreateTaskButton, TaskListView } from './components';

export default function TasksPage() {
  return (
    <main className="flex flex-col">
      <Toaster position="top-left" />
      <Navbar />
      <div className="mx-25 mt-14">
        <h2 className="text-5xl font-semibold text-zinc-300">My Tasks</h2>
        <div className="mb-25 mt-12 h-[1px] w-full bg-zinc-900"></div>
        <div className="flex w-full items-center justify-center">
          <TaskListView />
        </div>
      </div>
      <div className="mt-24"></div>
      <div className="fixed bottom-4 right-4">
        <CreateTaskButton />
      </div>
    </main>
  );
}
