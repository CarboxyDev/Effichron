'use client';

import ActionButton from '@/components/ActionButton';
import Navbar from '@/components/Navbar';
import TaskList from '@/components/TaskList';
import Timer from '@/components/Timer';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { validateTaskStructure } from './helpers';

export default function TimerPage() {
  useEffect(() => {
    validateTaskStructure();
  }, []);

  return (
    <main className="flex flex-col">
      <Toaster position="top-left" />
      <Navbar />
      <div className="mt-40">
        <Timer />
        <div className="mt-24"></div>
        <TaskList />
        <div className="mt-24"></div>
        <div className="fixed bottom-4 right-4">
          <ActionButton />
        </div>
      </div>
    </main>
  );
}
