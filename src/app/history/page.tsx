import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import SessionHistoryContainer from './components';

export default function HistoryPage() {
  return (
    <main className="flex flex-col">
      <Toaster position="top-left" />
      <Navbar />
      <div className="mt-14"></div>
      <div className="mx-25">
        <h2 className="text-5xl font-semibold text-zinc-300">
          Sessions History
        </h2>
        <div className="mb-20 mt-12 h-[1px] w-full bg-zinc-900"></div>
        <div className="flex w-full items-center justify-center">
          <SessionHistoryContainer />
        </div>
      </div>
      <div className="mt-24"></div>
    </main>
  );
}
