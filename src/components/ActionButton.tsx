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
          className="group flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 text-zinc-200 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-400 active:scale-105"
        >
          <Icon
            icon="majesticons:timer-line"
            className={cn(open && '', 'h-6 w-6 text-zinc-200')}
          />
        </button>
        {open && (
          <button
            onClick={() => {
              saveSession();
              setOpen(false);
            }}
            title="Save session"
            className="group absolute bottom-14 right-0 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-500 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-400 active:scale-105"
          >
            <Icon icon="mdi:success" className="h-6 w-6 text-zinc-300" />
          </button>
        )}
        {open && (
          <button
            onClick={() => {
              resetActiveTaskTimer();
              setOpen(false);
            }}
            title="Reset task"
            className="group absolute right-14 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-500 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-red-600 active:scale-105"
          >
            <Icon icon="mdi:trash-outline" className="h-6 w-6 text-zinc-300" />
          </button>
        )}
      </div>
    </>
  );
};

export default ActionButton;
