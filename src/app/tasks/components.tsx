'use client';
import { useStore } from '@/lib/store/useStore';
import { useGetTasks } from '@/lib/store/useTasks';
import { Task } from '@/lib/types';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';

export const TaskListView = () => {
  console.log('Render TaskListView');
  const tasks = useStore(useGetTasks, (state) => state) as Task[];

  return (
    <>
      <div className="flex flex-col gap-y-5">
        {tasks?.map((task) => {
          return (
            <div
              key={task.id}
              className={cn(
                'group group h-28 w-160 rounded-lg border border-transparent bg-zinc-800 transition delay-75 duration-200 ease-in hover:cursor-pointer hover:border hover:border-zinc-800 hover:bg-zinc-900'
              )}
            >
              <div className="ml-7 flex h-full flex-row items-center">
                <div className="mr-auto flex flex-row items-center gap-x-8">
                  <div
                    className="h-12 w-12 rounded-full group-hover:animate-pulse"
                    style={{ backgroundColor: task.color }}
                  ></div>
                  <div className="text-lg text-zinc-200">{task.name}</div>
                </div>
                <div className="ml-auto mr-7 text-base text-zinc-500">Edit</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const CreateTaskButton = () => {
  return (
    <>
      <button
        title="Create task"
        className="group flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500 text-zinc-200 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-600 active:scale-105"
      >
        <Icon icon="ph:plus-bold" className="h-7 w-7 text-zinc-200" />
      </button>
    </>
  );
};
