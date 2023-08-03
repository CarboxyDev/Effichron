import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { SessionHistoryContainer } from './components';

export default function HistoryPage() {
  return (
    <main className="flex flex-col">
      <Toaster position="top-left" />
      <Navbar />
      <div className="mx-6 mt-14 md:mx-25">
        <h2 className="text-3xl font-semibold text-zinc-200 md:text-5xl">
          Sessions History
        </h2>
        <div className="mb-25 mt-6 h-px bg-zinc-900 md:mt-12"></div>
        <div className="flex items-center justify-center">
          <SessionHistoryContainer />
        </div>
      </div>
      <div className="mt-24"></div>
      <Footer />
    </main>
  );
}
