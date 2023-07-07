import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { CreateTaskButton, TaskListView } from './components';

export default function TasksPage() {
  return (
    <main className="flex flex-col">
      <Toaster position="top-left" />
      <Navbar />
      <div className="mt-14"></div>
      <div className="mx-25">
        <h2 className="text-5xl font-semibold text-zinc-200">My Tasks</h2>
        <div className="mb-20 mt-12 h-[2px] w-full bg-zinc-800"></div>
        <div className="flex w-full items-center justify-center">
          <TaskListView />
          <div className="fixed bottom-4 right-4">
            <CreateTaskButton />
          </div>
        </div>
      </div>
    </main>
  );
}
