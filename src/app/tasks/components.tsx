'use client';

import { Badge } from '@/components/Other';
import { useStore } from '@/lib/store/useStore';
import { useGetTasks } from '@/lib/store/useTasks';
import { Task } from '@/lib/types';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { SyncTasksConfirmationDialog } from '../timer/dialogs';
import { CreateTaskDialog } from './dialogs';
import { TaskDropdownMenu, TaskDropdownMenuProps } from './dropdowns';

export const TaskListView = () => {
  console.log('Render TaskListView');
  const tasks = useStore(useGetTasks, (state) => state) as Task[];

  return (
    <>
      {tasks?.map((task) => {
        let isDemoTask = false;
        if (task.id.includes('demo')) {
          isDemoTask = true;
        }
        return (
          <div
            key={task.id}
            className={cn(
              'group h-24 w-full rounded-lg border border-dark-800 bg-dark-900 shadow-sm transition-all delay-200 duration-300 ease-in-out hover:border-dark-700 md:mx-0 md:h-28 md:w-160'
            )}
          >
            <div className="ml-5 flex h-full flex-row items-center md:ml-7">
              <div className="mr-auto flex flex-row items-center gap-x-4 md:gap-x-8">
                <div
                  className="h-9 w-9 rounded-full group-hover:animate-pulse md:h-12 md:w-12"
                  style={{ backgroundColor: task.color }}
                ></div>
                <div className="flex items-center text-base text-dark-300 md:text-lg">
                  {task.name}
                  {isDemoTask && (
                    <span className="ml-4">
                      <Badge text="DEMO" />
                    </span>
                  )}
                </div>
              </div>
              <TaskMoreOptionsButton task={task} />
            </div>
          </div>
        );
      })}
      {
        /* This is done to prevent layout shift when the tasks are loaded */
        tasks && (
          <>
            <CreateTaskButton />
            <SyncTasksButton />
          </>
        )
      }
    </>
  );
};

const TaskMoreOptionsButton = (props: TaskDropdownMenuProps) => {
  const { task } = props;

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <Icon
            icon="material-symbols:more-vert"
            className="ml-auto mr-5 h-6 w-6 text-dark-600 hover:cursor-pointer hover:text-dark-700 md:mr-7"
          ></Icon>
        </DropdownMenu.Trigger>
        <TaskDropdownMenu task={task} />
      </DropdownMenu.Root>
    </>
  );
};

export const CreateTaskButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <div
            title="Create task"
            className={cn(
              'group flex h-24 w-full items-center justify-center rounded-lg border border-emerald-500 bg-emerald-500 shadow-sm transition-all delay-200 duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-emerald-600 md:mx-0 md:h-28 md:w-160'
            )}
          >
            <span className="text-lg font-semibold">CREATE TASK</span>
          </div>
        </Dialog.Trigger>
        <CreateTaskDialog setOpen={setOpen} />
      </Dialog.Root>
    </>
  );
};

export const SyncTasksButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger asChild>
          <div
            title="Sync tasks"
            className={cn(
              'group flex h-24 w-full items-center justify-center rounded-lg bg-transparent text-sky-500 shadow-sm transition-all delay-200 duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-sky-500 hover:text-white md:mx-0 md:h-28 md:w-160'
            )}
          >
            <span className="text-lg font-semibold">SYNC TASKS</span>
          </div>
        </Dialog.Trigger>
        <SyncTasksConfirmationDialog
          setDialogOpen={setDialogOpen}
          setActionMenuOpen={null}
        />
      </Dialog.Root>
    </>
  );
};
