'use client';
import { useStore } from '@/lib/store/useStore';
import { useRefreshTasks, useTasks } from '@/lib/store/useTasks';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import { useState } from 'react';

// NOTE: Maybe use an icon to convey meaning of the button instead of two words of text

const ActionButton = () => {
  const refreshTasks = useRefreshTasks();
  const [open, setOpen] = useState(false);

  const saveSession = (): void => {
    // TODO: Take a snapshot of the task store and upload to database
    // Convey success via popup/toast and only after that reset the local session
    refreshTasks();
  };

  return (
    <>
      <div className="inline-flex">
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 group flex items-center justify-center bg-blue-500 text-zinc-200 rounded-lg hover:cursor-pointer hover:bg-blue-400 transition duration-300 ease-in-out active:scale-105"
        >
          <Icon
            icon="majesticons:timer-line"
            className={cn(open && '', 'w-8 h-8 text-zinc-200')}
          />
        </button>
        {open && (
          <button
            onClick={() => {
              saveSession();
              setOpen(false);
            }}
            className="absolute bottom-16 w-14 h-14 group flex items-center justify-center bg-zinc-500 rounded-lg hover:cursor-pointer hover:bg-emerald-400 transition duration-300 ease-in-out active:scale-105"
          >
            <Icon icon="mdi:success" className="w-8 h-8 text-zinc-300" />
          </button>
        )}
        {open && (
          <button className="absolute right-16 w-14 h-14 group flex items-center justify-center bg-zinc-500 rounded-lg hover:cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out active:scale-105">
            <Icon icon="mdi:trash-outline" className="w-8 h-8 text-zinc-300" />
          </button>
        )}
      </div>
    </>
  );
};

export default ActionButton;
