'use client';

import { useState } from 'react';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ResetActiveTaskConfirmationDialog,
  SaveSessionConfirmationDialog,
} from './Dialogs';

const ActionButton = () => {
  console.log('Render ActionButton');
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="inline-flex">
        <button
          onClick={() => setOpen(!open)}
          title="View actions"
          className="group flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500 text-zinc-200 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-violet-600 active:scale-105"
        >
          <Icon
            icon="ic:round-timer"
            className={cn(open && '', 'h-7 w-7 text-zinc-200')}
          />
        </button>
        {open && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                title="Save session"
                className="group absolute bottom-14 right-0 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-400 active:scale-105"
              >
                <Icon icon="mdi:success" className="h-7 w-7 text-zinc-300" />
              </button>
            </Dialog.Trigger>
            <SaveSessionConfirmationDialog setActionMenuOpen={setOpen} />
          </Dialog.Root>
        )}
        {open && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                onClick={() => {
                  //resetActiveTaskTimer();
                }}
                title="Reset task"
                className="group absolute right-14 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-red-600 active:scale-105"
              >
                <Icon
                  icon="mdi:trash-outline"
                  className="h-7 w-7 text-zinc-300"
                />
              </button>
            </Dialog.Trigger>
            <ResetActiveTaskConfirmationDialog setActionMenuOpen={setOpen} />
          </Dialog.Root>
        )}
      </div>
    </>
  );
};

export default ActionButton;
