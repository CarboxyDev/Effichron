import ActionButton from '@/components/ActionButton';
import Navbar from '@/components/Navbar';
import TaskList from '@/components/TaskList';
import Timer from '@/components/Timer';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Toaster position="top-left" />
      <Navbar />
      <div className="mt-40">
        <Timer />
        <div className="mt-24"></div>
        <TaskList />
        <div className="fixed bottom-4 right-4">
          <ActionButton />
        </div>
      </div>
    </main>
  );
}
