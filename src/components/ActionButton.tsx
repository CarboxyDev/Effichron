'use client';

import { useRefreshTasks, useResetActiveTask } from '@/lib/store/useTasks';
import { notify } from '@/utils/notify';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const AddTaskPopup = (): JSX.Element => {
  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="py- fixed left-[50%] top-[50%] h-100 w-120 translate-x-[-50%] translate-y-[-50%] rounded-lg bg-zinc-800 px-12 py-16 text-zinc-200 shadow-xl">
          <Dialog.Title className="text-lg font-medium">
            Create new task
          </Dialog.Title>
          <Dialog.Description />
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
};

// NOTE: Maybe use an icon to convey meaning of the button instead of two words of text
const ActionButton = () => {
  const refreshTasks = useRefreshTasks();
  const resetActiveTask = useResetActiveTask();
  const [open, setOpen] = useState(false);

  const saveSession = (): void => {
    // TODO: Take a snapshot of the task store and upload to database
    // Convey success via popup/toast and only after that reset the local session
    notify('Saved the current session', 'success');
    refreshTasks();
  };

  const resetActiveTaskTimer = (): void => {
    // TODO: Ask confirmation via a popup and add a toast as confirmation of reset
    notify('Reset the active task timer', 'warning');
    resetActiveTask();
  };

  const createTask = (): void => {};

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
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                onClick={() => {
                  createTask();
                  //setOpen(false);
                }}
                title="Create new task"
                className="group absolute bottom-14 right-14  flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 transition duration-300 ease-in-out hover:bg-violet-500 active:scale-105"
              >
                <Icon icon="ic:round-plus" className="h-7 w-7 text-zinc-300" />
              </button>
            </Dialog.Trigger>
            <AddTaskPopup />
          </Dialog.Root>
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
