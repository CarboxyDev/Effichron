'use client';

import { useState } from 'react';
import {
  getTasks,
  useRefreshTasks,
  useResetActiveTask,
} from '@/lib/store/useTasks';
import { SessionSnapshot } from '@/lib/types';
import { notify, notifyPromise } from '@/utils/notify';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const ActionButton = () => {
  console.log('Render ActionButton');

  const refreshTasks = useRefreshTasks();
  const resetActiveTask = useResetActiveTask();
  const [open, setOpen] = useState(false);

  const sessionMutation = useMutation({
    mutationFn: async (sessionSnapshot: SessionSnapshot) => {
      const save = axios.post('/api/session', sessionSnapshot, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      notifyPromise(save, {
        loading: 'Saving session...',
        success: 'Saved your session',
        error: 'Unable to save your session',
      });
      return save;
    },
    onSuccess: () => {
      refreshTasks();
    },
    onError: () => {},
  });

  const saveSession = async () => {
    const sessionSnapshot = getTasks();
    sessionMutation.mutate({
      session: sessionSnapshot,
    });
  };

  const resetActiveTaskTimer = (): void => {
    // TODO: Ask confirmation via a popup and add a toast as confirmation of reset
    notify('Reset the active task timer', 'warning');
    resetActiveTask();
  };

  return (
    <>
      <div className="inline-flex">
        <button
          onClick={() => setOpen(!open)}
          title="View actions"
          className="group flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500 text-zinc-200 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-violet-600 active:scale-105"
        >
          <Icon
            icon="majesticons:timer-line"
            className={cn(open && '', 'h-7 w-7 text-zinc-200')}
          />
        </button>
        {open && (
          <button
            onClick={() => {
              saveSession();
              setOpen(false);
            }}
            title="Save session"
            className="group absolute bottom-14 right-0 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-400 active:scale-105"
          >
            <Icon icon="mdi:success" className="h-7 w-7 text-zinc-300" />
          </button>
        )}
        {open && (
          <button
            onClick={() => {
              resetActiveTaskTimer();
              setOpen(false);
            }}
            title="Reset task"
            className="group absolute right-14 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-red-600 active:scale-105"
          >
            <Icon icon="mdi:trash-outline" className="h-7 w-7 text-zinc-300" />
          </button>
        )}
      </div>
    </>
  );
};

export default ActionButton;
