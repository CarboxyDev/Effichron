import DialogTemplate from '@/components/Dialog';
import {
  getTasks,
  usePauseActiveTask,
  useRefreshTasks,
  useResetActiveTask,
} from '@/lib/store/useTasks';
import { SessionSnapshot } from '@/lib/types';
import { getErrorMessage } from '@/utils/api';
import { notify, notifyPromise } from '@/utils/notify';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

export const SaveSessionConfirmationDialog = (props: {
  setActionMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const refreshTasks = useRefreshTasks();

  const sessionMutation = useMutation({
    mutationFn: async (sessionSnapshot: SessionSnapshot) => {
      const save = axios.post('/api/session', sessionSnapshot, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const sessionToast = notifyPromise(save, {
        loading: 'Saving session...',
        success: 'Saved your session',
        error: (error) => getErrorMessage(error),
      });

      // Close the Action buttons menu
      props.setActionMenuOpen(false);

      return save;
    },
    onSuccess: () => {
      refreshTasks();
    },
  });

  const saveSession = async () => {
    const sessionSnapshot = getTasks();
    sessionMutation.mutate({
      session: sessionSnapshot,
    });
  };

  return (
    <>
      <DialogTemplate title="Save session">
        <div className="mx-auto mt-12 flex flex-col">
          <h3 className="text-center text-[22px] font-medium text-zinc-300">
            Are you sure you want to save the current session?
          </h3>
          <div className="mx-6 mt-12 text-zinc-500">
            <ul className="list-outside list-disc">
              <li className="mb-4">
                The current session will be saved in our database.
              </li>
              <li className="mb-4">
                You may access all your saved sessions by going to the{' '}
                <Link href="/history" className="text-violet-400">
                  History
                </Link>{' '}
                page.
              </li>
              <li>This will reset all the task timers.</li>
            </ul>
          </div>

          <button
            className="mt-12 flex h-11 items-center justify-center rounded-lg bg-violet-500 text-lg font-medium text-zinc-200 transition delay-200 duration-200 ease-in-out hover:scale-105 hover:bg-violet-600"
            type="submit"
            onClick={() => {
              saveSession();
            }}
          >
            Confirm
          </button>
        </div>
      </DialogTemplate>
    </>
  );
};

export const ResetActiveTaskConfirmationDialog = (props: {
  setActionMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const resetActiveTask = useResetActiveTask();
  const pauseActiveTask = usePauseActiveTask();

  const resetActiveTaskTimer = (): void => {
    notify('Reset the active task timer', 'warning');
    resetActiveTask();
    pauseActiveTask();
  };

  return (
    <>
      <DialogTemplate title="Reset Task">
        <div className="mx-auto mt-12 flex flex-col">
          <h3 className="text-center text-[22px] font-medium text-zinc-300">
            Are you sure you want to reset the active task?
          </h3>
          <div className="mx-6 mt-16 text-zinc-500">
            <ul className="list-outside list-disc">
              <li className="mb-4">
                This will reset the currently active task&apos;s timer.
              </li>
              <li>The data for this task will be deleted.</li>
            </ul>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-4">
            <button
              className="flex h-11 items-center justify-center rounded-lg bg-zinc-600 text-lg font-medium text-zinc-200 transition delay-200 duration-200 ease-in-out hover:bg-zinc-700"
              onClick={() => {
                props.setActionMenuOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="flex h-11 items-center justify-center rounded-lg bg-red-500 text-lg font-medium text-zinc-100 transition delay-200 duration-200 ease-in-out hover:bg-red-600"
              type="submit"
              onClick={() => {
                resetActiveTaskTimer();
                props.setActionMenuOpen(false);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </DialogTemplate>
    </>
  );
};

export const SyncTasksConfirmationDialog = (props: {
  setActionMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const syncTasks = () => {
    // wip
  };

  return (
    <>
      <DialogTemplate title="Sync Tasks">
        <div className="mx-auto mt-12 flex flex-col">
          <h3 className="text-center text-[22px] font-medium text-zinc-300">
            Are you sure you want to sync your tasks?
          </h3>
          <div className="mx-6 mt-16 text-zinc-500">
            <ul className="list-outside list-disc">
              <li className="mb-4">
                This will fetch all the tasks that you have created.
              </li>
              <li className="mb-4">
                You may sync if you are missing some of your tasks or if you use
                this app on multiple devices.
              </li>
              <li>Your tasks&apos; progress will be retained.</li>
            </ul>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-4">
            <button
              className="flex h-11 items-center justify-center rounded-lg bg-zinc-600 text-lg font-medium text-zinc-200 transition delay-200 duration-200 ease-in-out hover:bg-zinc-700"
              onClick={() => {
                props.setActionMenuOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="flex h-11 items-center justify-center rounded-lg bg-sky-500 text-lg font-medium text-zinc-100 transition delay-200 duration-200 ease-in-out hover:bg-sky-600"
              type="submit"
              onClick={() => {
                syncTasks();
                props.setActionMenuOpen(false);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </DialogTemplate>
    </>
  );
};
