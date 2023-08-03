'use client';

import { useStore } from '@/lib/store/useStore';
import { useDeleteTask, useGetTasks } from '@/lib/store/useTasks';
import { Task } from '@/lib/types';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { CreateTaskDialog } from './dialogs';
import { TaskDropdownMenu, TaskDropdownMenuProps } from './dropdowns';

export const TaskListView = () => {
  console.log('Render TaskListView');
  const tasks = useStore(useGetTasks, (state) => state) as Task[];
  const deleteTaskFn = useDeleteTask();

  return (
    <>
      {tasks?.map((task) => {
        return (
          <div
            key={task.id}
            className={cn(
              'group h-24 w-11/12 rounded-lg border border-zinc-800 bg-zinc-900 shadow-sm transition-all delay-200 duration-300 ease-in-out hover:cursor-pointer hover:border-zinc-700 md:mx-0 md:h-28 md:w-160'
            )}
          >
            <div className="ml-5 flex h-full flex-row items-center md:ml-7">
              <div className="mr-auto flex flex-row items-center gap-x-4 md:gap-x-8">
                <div
                  className="h-9 w-9 rounded-full group-hover:animate-pulse md:h-12 md:w-12"
                  style={{ backgroundColor: task.color }}
                ></div>
                <div className="text-base text-zinc-300 md:text-lg">
                  {task.name}
                </div>
              </div>
              <TaskMoreOptionsButton
                task={task}
                actions={{ deleteFn: deleteTaskFn }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

const TaskMoreOptionsButton = (props: TaskDropdownMenuProps) => {
  const { task, actions } = props;
  const deleteTaskFn = actions.deleteFn;

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <Icon
            icon="material-symbols:more-vert"
            className="ml-auto mr-5 h-6 w-6 text-zinc-600 hover:cursor-pointer hover:text-zinc-700 md:mr-7"
          ></Icon>
        </DropdownMenu.Trigger>
        <TaskDropdownMenu task={task} actions={{ deleteFn: deleteTaskFn }} />
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
          <button
            title="Create task"
            className="group flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500 text-zinc-200 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-600 active:scale-105"
          >
            <Icon icon="ph:plus-bold" className="h-7 w-7 text-zinc-200" />
          </button>
        </Dialog.Trigger>
        <CreateTaskDialog setOpen={setOpen} />
      </Dialog.Root>
    </>
  );
};
