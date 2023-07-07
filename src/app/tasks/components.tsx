'use client';
import { useStore } from '@/lib/store/useStore';
import { useAddTask, useGetTasks } from '@/lib/store/useTasks';
import { Task } from '@/lib/types';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { v4 as uuidv4 } from 'uuid';

export const TaskListView = () => {
  console.log('Render TaskListView');
  const tasks = useStore(useGetTasks, (state) => state) as Task[];

  return (
    <>
      <div className="flex flex-col gap-y-3">
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
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            title="Create task"
            className="group flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500 text-zinc-200 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-600 active:scale-105"
          >
            <Icon icon="ph:plus-bold" className="h-7 w-7 text-zinc-200" />
          </button>
        </Dialog.Trigger>
        <CreateTaskDialog />
      </Dialog.Root>
    </>
  );
};

const CreateTaskDialog = () => {
  const addTask = useAddTask();
  const [color, setColor] = useState('#22d3ee');
  const [taskName, setTaskName] = useState('Untitled');

  function createTask(name: string, color: string) {
    const newTask: Task = {
      id: uuidv4(),
      name: name,
      color: color,
      isActive: false,
      duration: 0,
    };

    addTask(newTask);
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:insert-animate-here fixed inset-0 bg-zinc-900/40" />
        <Dialog.Content className="fixed left-[50%] top-[50%] h-120 w-100 translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-zinc-950 px-6 py-6">
          <div className="flex flex-row">
            <Dialog.Title className="mr-auto text-lg font-medium">
              New Task
            </Dialog.Title>
            <Dialog.Close className="ml-auto">
              <button>
                <Icon
                  icon="maki:cross"
                  className="h-5 w-5 text-zinc-200"
                ></Icon>
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description />
          <div className="mx-auto mt-20 flex w-3/4 flex-col">
            <label className="">Task</label>
            <input
              type="text"
              className="text-zinc-800"
              placeholder="untitled"
              onChange={(e) => setTaskName(e.target.value)}
            />
            <div className="mt-4"></div>
            <HexColorPicker color={color} onChange={setColor} />
            <div
              className="mt-4 h-6 w-6 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
            <div className="mt-4"></div>
            <button
              className=""
              type="submit"
              onClick={() => {
                createTask(taskName, color);
              }}
            >
              Create task
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
};
