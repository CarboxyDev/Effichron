import DialogTemplate from '@/components/Dialog';
import { useAddTask, useDeleteTask, useUpdateTask } from '@/lib/store/useTasks';
import { Task } from '@/lib/types';
import { notify } from '@/utils/notify';
import * as Dialog from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { v4 as uuidv4 } from 'uuid';

export const CreateTaskDialog = (props: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const addTask = useAddTask();
  const setOpen = props.setOpen;

  const [color, setColor] = useState('#0ea5e9');
  const [taskName, setTaskName] = useState('Untitled');
  const [openColorPicker, setOpenColorPicker] = useState(false);

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
      isTimerRunning: false,
      duration: 0,
      timerTimestamps: [],
      lastStartTime: null,
      sortPriority: 1,
    };

    addTask(newTask);
    notify('Created a new task', 'success');
    setOpen(false);
    setColor('#0ea5e9');
    setTaskName('Untitled');
  }

  return (
    <>
      <DialogTemplate
        title="New Task"
        contentMethods={{ onCloseAutoFocus: () => setOpenColorPicker(false) }}
      >
        <div className="mx-auto mt-12 flex flex-col">
          <div>
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
          <div className="absolute bottom-48 left-28 md:bottom-32 md:left-108">
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        )}
      </DialogTemplate>
    </>
  );
};

type EditTaskDialogProps = {
  trigger?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  task: Task;
};

export const EditTaskDialog = (props: EditTaskDialogProps) => {
  const { task, setOpen, open, trigger } = props;

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
      isTimerRunning: false,
      duration: task.duration, // For now, not resetting the task timer's duration. Maybe ask the user in the future if they want to reset it when editing?
      lastStartTime: null,
      timerTimestamps: [],
      sortPriority: task.sortPriority,
    };

    updateTaskFn(newTask);
    if (setOpen) setOpen(false);
    notify('Edited task ' + task.name, 'success');
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <DialogTemplate
          title="Edit Task"
          contentMethods={{
            onCloseAutoFocus: () => {
              setOpenColorPicker(false);
            },
          }}
        >
          <div className="mx-auto mt-12 flex flex-col">
            <div>
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
                  style={{ backgroundColor: color }}
                  onClick={() => setOpenColorPicker(!openColorPicker)}
                ></div>
                <input
                  type="text"
                  className="flex h-12 flex-grow rounded-lg bg-transparent bg-zinc-900 px-3 py-3 text-lg text-zinc-500 selection:bg-violet-500 selection:text-zinc-200 placeholder:text-zinc-600 focus:outline-violet-500"
                  placeholder={color.toUpperCase()}
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
            <div className="absolute bottom-48 left-28 md:bottom-32 md:left-108">
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </DialogTemplate>
      </Dialog.Root>
    </>
  );
};

type DeleteTaskDialogProps = {
  trigger?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  task: Task;
};

export const DeleteTaskDialog = (props: DeleteTaskDialogProps) => {
  const { task, setOpen, open, trigger } = props;

  const deleteTaskFn = useDeleteTask();

  const deleteTask = () => {
    deleteTaskFn(task.id);
    if (setOpen) setOpen(false);
    notify('Deleted task ' + task.name, 'warning');
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <DialogTemplate title="Delete Task">
          <div className="mx-auto mt-12 flex flex-col">
            <h3 className="text-center text-[22px] font-medium text-zinc-300">
              Are you sure you want to delete this task?
            </h3>
            <div className="mx-6 mt-16 text-zinc-500">
              <ul className="list-outside list-disc">
                <li>
                  You are deleting the task{' '}
                  <span className="text-violet-400">{task.name}</span>.
                </li>
                <li>
                  This task and it&apos;s associated timer will be deleted
                  forever.
                </li>
                <li>
                  The saved sessions which have this task will still retain the
                  saved data.
                </li>
              </ul>
            </div>

            <button
              className="mt-12 flex h-11 items-center justify-center rounded-lg bg-violet-500 text-lg font-medium text-zinc-200 transition delay-200 duration-200 ease-in-out hover:scale-105 hover:bg-violet-600"
              type="submit"
              onClick={() => deleteTask()}
            >
              Delete task
            </button>
          </div>
        </DialogTemplate>
      </Dialog.Root>
    </>
  );
};
