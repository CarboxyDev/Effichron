'use client';
import { useStore } from '@/lib/store/useStore';
import {
  useRefreshTasks,
  useResetActiveTask,
  useTasks,
} from '@/lib/store/useTasks';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import { useState } from 'react';

// NOTE: Maybe use an icon to convey meaning of the button instead of two words of text

const ActionButton = () => {
  const refreshTasks = useRefreshTasks();
  const resetActiveTask = useResetActiveTask();
  const [open, setOpen] = useState(false);

  const saveSession = (): void => {
    // TODO: Take a snapshot of the task store and upload to database
    // Convey success via popup/toast and only after that reset the local session
    refreshTasks();
  };

  const resetActiveTaskTimer = (): void => {
    // TODO: Ask confirmation via a popup and add a toast as confirmation of reset
    resetActiveTask();
  };

  return (
    <>
      <div className="inline-flex">
        <button
          onClick={() => setOpen(!open)}
          title="View actions"
          className="w-12 h-12 group flex items-center justify-center bg-blue-500 text-zinc-200 rounded-lg hover:cursor-pointer hover:bg-blue-400 transition duration-300 ease-in-out active:scale-105"
        >
          <Icon
            icon="majesticons:timer-line"
            className={cn(open && '', 'w-6 h-6 text-zinc-200')}
          />
        </button>
        {open && (
          <button
            onClick={() => {
              saveSession();
              setOpen(false);
            }}
            title="Save session"
            className="absolute right-0 bottom-14 w-12 h-12 group flex items-center justify-center bg-zinc-500 rounded-lg hover:cursor-pointer hover:bg-emerald-400 transition duration-300 ease-in-out active:scale-105"
          >
            <Icon icon="mdi:success" className="w-6 h-6 text-zinc-300" />
          </button>
        )}
        {open && (
          <button
            onClick={() => {
              resetActiveTaskTimer();
              setOpen(false);
            }}
            title="Reset task"
            className="absolute right-14 w-12 h-12 group flex items-center justify-center bg-zinc-500 rounded-lg hover:cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out active:scale-105"
          >
            <Icon icon="mdi:trash-outline" className="w-6 h-6 text-zinc-300" />
          </button>
        )}
      </div>
    </>
  );
};

export default ActionButton;
