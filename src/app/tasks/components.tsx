'use client';

import { useStore } from '@/lib/store/useStore';
import {
  useAddTask,
  useDeleteTask,
  useGetTasks,
  useUpdateTask,
} from '@/lib/store/useTasks';
import { Task } from '@/lib/types';
import { notify } from '@/utils/notify';
import { cn } from '@/utils/util';
import { Icon } from '@iconify/react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Dispatch, SetStateAction, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { v4 as uuidv4 } from 'uuid';

export const TaskListView = () => {
  console.log('Render TaskListView');
  const tasks = useStore(useGetTasks, (state) => state) as Task[];
  const deleteTaskFn = useDeleteTask();

  return (
    <>
      <div className="flex flex-col gap-y-3">
        {tasks?.map((task) => {
          return (
            <div
              key={task.id}
              className={cn(
                'group h-28 w-160 rounded-lg border border-zinc-800 bg-zinc-900 transition-all delay-200 duration-300 ease-in-out hover:border hover:border-zinc-700'
              )}
            >
              <div className="ml-7 flex h-full flex-row items-center">
                <div className="mr-auto flex flex-row items-center gap-x-8">
                  <div
                    className="h-12 w-12 rounded-full group-hover:animate-pulse"
                    style={{ backgroundColor: task.color }}
                  ></div>
                  <div className="text-lg text-zinc-300">{task.name}</div>
                </div>
                <TaskMoreOptionsButton
                  task={task}
                  actions={{ deleteFn: deleteTaskFn }}
                />
              </div>
            </div>
          );
        })}
      </div>
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
            className="ml-auto mr-7 h-6 w-6 text-zinc-600 hover:cursor-pointer hover:text-zinc-700"
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

const CreateTaskDialog = (props: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const addTask = useAddTask();
  const setOpen = props.setOpen;

  const [color, setColor] = useState('#0ea5e9');
  const [taskName, setTaskName] = useState('Untitled');
  const [openColorPicker, setOpenColorPicker] = useState(false);

  console.log(
    `Render CreateTaskDialog values={color: ${color}, name: ${taskName}}`
  );

  function createTask(name: string, color: string) {
    console.log('Create Task');
    if (name.length === 0) {
      name = 'Untitled';
    }
    if (color.length === 0) {
      color = '#0ea5e9';
    }
    if (name.length > 20) {
      notify('Try to shorten the task name', 'warning');
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      name: name,
      color: color,
      isActive: false,
      duration: 0,
    };

    addTask(newTask);
    notify('Created a new task', 'success');
    setOpen(false);
    setColor('#0ea5e9');
    setTaskName('Untitled');
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:insert-animate-here fixed inset-0 bg-zinc-900/40" />
        <Dialog.Content
          onCloseAutoFocus={() => setOpenColorPicker(false)}
          className="fixed left-[50%] top-[50%] w-100 translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-8 shadow-xl"
        >
          <div className="flex flex-row">
            <Dialog.Title className="mr-auto text-lg font-semibold text-zinc-300">
              New Task
            </Dialog.Title>
            <Dialog.Close asChild className="ml-auto">
              <button>
                <Icon
                  icon="maki:cross"
                  className="h-5 w-5 text-zinc-500"
                ></Icon>
              </button>
            </Dialog.Close>
          </div>
          <div className="mx-auto mt-12 flex flex-col">
            <div className="">
              <label className="mx-1 text-lg font-medium text-zinc-500">
                Name
              </label>
              <input
                type="text"
                className="mt-3 h-12 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3 text-lg text-zinc-500 selection:bg-violet-500 selection:text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
                placeholder={taskName || 'Untitled'}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <label className="mx-1 text-lg font-medium text-zinc-500">
                Color
              </label>
              <div className="mt-3 flex flex-row items-center">
                <div
                  className="mr-4 h-9 w-9 rounded-full hover:cursor-pointer"
                  style={{ backgroundColor: color || '#8b5cf6' }}
                  onClick={() => setOpenColorPicker(!openColorPicker)}
                ></div>
                <input
                  type="text"
                  className="flex h-12 flex-grow rounded-lg border border-zinc-800 bg-transparent bg-zinc-900 px-3 py-3 text-lg text-zinc-500 selection:bg-violet-500 selection:text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
                  placeholder={(color || '#8b5cf6').toUpperCase()}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              className="mt-12 flex h-11 items-center justify-center rounded-lg bg-violet-500 text-lg font-medium text-zinc-200 transition delay-200 duration-200 ease-in-out hover:scale-105 hover:bg-violet-600"
              type="submit"
              onClick={() => {
                createTask(taskName, color);
              }}
            >
              Create task
            </button>
          </div>
          {openColorPicker && (
            <div className="absolute bottom-32 left-108">
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
};

interface TaskDropdownMenuProps {
  task: Task;
  actions: {
    deleteFn: (id: string) => void;
  };
}

const TaskDropdownMenu = (props: TaskDropdownMenuProps) => {
  const { task } = props;
  const deleteTask = props.actions.deleteFn;

  return (
    <>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={0}
          className="flex w-30 select-none flex-col items-center rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl"
        >
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <DropdownMenu.Item
                className="w-full flex-1 rounded-t-lg border-b border-b-zinc-800 py-3 text-center text-zinc-300 transition delay-200 duration-300 ease-in-out hover:cursor-pointer hover:bg-zinc-800 focus:outline-none"
                onClick={() => {}}
              >
                Edit
              </DropdownMenu.Item>
            </Dialog.Trigger>
            <EditTaskDialog task={task} />
          </Dialog.Root>
          <DropdownMenu.Item
            className="w-full flex-1 rounded-b-lg py-3 text-center text-zinc-300 transition delay-200 duration-300 ease-in-out hover:cursor-pointer hover:bg-zinc-800 focus:outline-none"
            onClick={() => {
              deleteTask(task.id);
              notify('Deleted task ' + task.name, 'warning');
            }}
          >
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </>
  );
};

const EditTaskDialog = (props: { task: Task }) => {
  const { task } = props;

  const updateTaskFn = useUpdateTask();

  const [color, setColor] = useState(task.color);
  const [taskName, setTaskName] = useState(task.name);
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const editTask = () => {
    if (taskName.length === 0) {
      setTaskName('Untitled');
    }
    if (color.length === 0) {
      setColor('#0ea5e9');
    }
    if (taskName.length > 20) {
      notify('Try to shorten the task name', 'warning');
      return;
    }

    const newTask: Task = {
      id: task.id,
      name: taskName,
      color: color,
      isActive: false,
      duration: task.duration, // For now, not resetting the task timer's duration. Maybe ask the user in the future if they want to reset it when editing?
    };

    updateTaskFn(newTask);
    notify('Edited task ' + task.name, 'success');
  };

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:insert-animate-here fixed inset-0 bg-zinc-900/40" />
        <Dialog.Content
          onCloseAutoFocus={() => setOpenColorPicker(false)}
          className="fixed left-[50%] top-[50%] w-100 translate-x-[-50%] translate-y-[-50%] rounded-2xl border border border-zinc-800 border-zinc-800 bg-zinc-950 px-6 py-8 shadow-xl"
        >
          <div className="flex flex-row">
            <Dialog.Title className="mr-auto text-lg font-semibold text-zinc-300">
              Edit Task
            </Dialog.Title>
            <Dialog.Close asChild className="ml-auto">
              <button>
                <Icon
                  icon="maki:cross"
                  className="h-5 w-5 text-zinc-500"
                ></Icon>
              </button>
            </Dialog.Close>
          </div>
          <div className="mx-auto mt-12 flex flex-col">
            <div className="">
              <label className="mx-1 text-lg font-medium text-zinc-500">
                Name
              </label>
              <input
                type="text"
                className="mt-3 h-12 w-full rounded-lg bg-zinc-900 px-3 py-3 text-lg text-zinc-500 selection:bg-violet-500 selection:text-zinc-200 placeholder:text-zinc-600 focus:outline-violet-500"
                placeholder={task.name}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <label className="mx-1 text-lg font-medium text-zinc-500">
                Color
              </label>
              <div className="mt-3 flex flex-row items-center">
                <div
                  className="mr-4 h-9 w-9 rounded-full hover:cursor-pointer"
                  style={{ backgroundColor: task.color }}
                  onClick={() => setOpenColorPicker(!openColorPicker)}
                ></div>
                <input
                  type="text"
                  className="flex h-12 flex-grow rounded-lg bg-transparent bg-zinc-900 px-3 py-3 text-lg text-zinc-500 selection:bg-violet-500 selection:text-zinc-200 placeholder:text-zinc-600 focus:outline-violet-500"
                  placeholder={task.color.toUpperCase()}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              className="mt-12 flex h-11 items-center justify-center rounded-lg bg-violet-500 text-lg font-medium text-zinc-200 transition delay-200 duration-200 ease-in-out hover:scale-105 hover:bg-violet-600"
              type="submit"
              onClick={() => editTask()}
            >
              Edit task
            </button>
          </div>
          {openColorPicker && (
            <div className="absolute bottom-32 left-108">
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
};
