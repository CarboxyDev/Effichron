import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

export default function HistoryPage() {
  return (
    <main className="flex flex-col">
      <Toaster position="top-left" />
      <Navbar />
    </main>
  );
}
