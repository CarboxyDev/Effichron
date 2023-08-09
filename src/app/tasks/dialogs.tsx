import DialogTemplate from '@/components/Dialog';
import { CONFIG } from '@/lib/config';
import { useAddTask, useDeleteTask, useUpdateTask } from '@/lib/store/useTasks';
import { Task } from '@/lib/types';
import { getErrorMessage } from '@/utils/api';
import { notify, notifyPromise } from '@/utils/notify';
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export const CreateTaskDialog = (props: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const addTask = useAddTask();
  const setOpen = props.setOpen;

  const [color, setColor] = useState('#0ea5e9');
  const [taskName, setTaskName] = useState('Untitled');
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const createTaskMutation = useMutation({
    mutationFn: async (newTask: Task) => {
      const taskToCreate = {
        name: newTask.name,
        color: newTask.color,
      };

      const addTaskPromise = axios.post('/api/task', taskToCreate, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const addTaskToast = notifyPromise(addTaskPromise, {
        loading: 'Creating task...',
        success: 'Created the task',
        error: (error) => getErrorMessage(error),
      });

      return addTaskPromise;
    },
    onSuccess: (result, task) => {
      // ! This taskid is important and must be provided ONLY by the server.
      const res = JSON.parse(result.data);
      const taskid = res.taskid;
      task.id = taskid;
      addTask(task);
      setColor('#0ea5e9');
      setTaskName('Untitled');
    },
  });

  async function createTask(name: string, color: string) {
    if (name.length === 0) {
      name = 'Untitled';
    }
    if (color.length === 0) {
      color = '#0ea5e9';
    }
    if (name.length > 20) {
      notify('Task name is too long', 'warning');
      return;
    }

    setOpen(false); // Close the create task modal

    const newTask: Task = {
      id: '',
      name: name,
      color: color,
      isTimerRunning: false,
      duration: 0,
      timerTimestamps: [],
      sortPriority: 1,
      version: CONFIG.LATEST_TASK_VERSION,
    };

    createTaskMutation.mutate(newTask);
  }

  return (
    <>
      <DialogTemplate
        title="New Task"
        dialogContentMethods={{
          onCloseAutoFocus: () => setOpenColorPicker(false),
        }}
      >
        <div className="mx-auto mt-12 flex flex-col">
          <div>
            <label className="mx-1 text-lg font-medium text-dark-500">
              Name
            </label>
            <input
              type="text"
              className="mt-3 h-12 w-full rounded-lg border border-dark-800 bg-dark-900 px-3 py-3 text-lg text-dark-500 selection:bg-primary-500 selection:text-dark-200 placeholder:text-dark-600 focus:border-dark-700 focus:outline-none"
              placeholder={taskName || 'Untitled'}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <label className="mx-1 text-lg font-medium text-dark-500">
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
                className="flex h-12 flex-grow rounded-lg border border-dark-800 bg-dark-900 bg-transparent px-3 py-3 text-lg text-dark-500 selection:bg-primary-500 selection:text-dark-200 placeholder:text-dark-600 focus:border-dark-700 focus:outline-none"
                placeholder={(color || '#8b5cf6').toUpperCase()}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </div>
          </div>
          <button
            className="mt-12 flex h-11 items-center justify-center rounded-lg bg-primary-500 text-lg font-medium text-dark-200 transition delay-200 duration-200 ease-in-out hover:scale-105 hover:bg-primary-600"
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

  const [color, setColor] = useState(task.color);
  const [taskName, setTaskName] = useState(task.name);
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const updateTaskFn = useUpdateTask();

  const editTaskMutation = useMutation({
    mutationFn: async (requiredData: {
      taskid: string;
      name: string;
      color: string;
    }) => {
      const { taskid, name, color } = requiredData;
      const editData = {
        id: taskid,
        name,
        color,
      };

      const editPromise = axios.put('/api/task', editData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const editToast = notifyPromise(editPromise, {
        loading: 'Editing the task...',
        success: 'Edited the task',
        error: (error) => getErrorMessage(error),
      });

      return editPromise;
    },
    onSuccess: () => {
      const newTask: Task = {
        id: task.id,
        name: taskName,
        color: color,
        isTimerRunning: false,
        duration: task.duration, // For now, not resetting the task timer's duration. Maybe ask the user in the future if they want to reset it when editing?
        timerTimestamps: task.timerTimestamps,
        sortPriority: task.sortPriority,
        version: CONFIG.LATEST_TASK_VERSION,
      };

      updateTaskFn(newTask);
    },
  });

  const editTask = () => {
    const isDemoTask = task.id.includes('demo');
    if (isDemoTask) {
      notify('You cannot edit a demo task', 'warning');
      if (setOpen) {
        setOpen(false);
      }
      return;
    }
    // These checks are also implemented server side
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
    // Client side check only
    if (taskName === task.name && task.color === color) {
      notify('You are trying to edit nothing', 'warning');
      return;
    }

    editTaskMutation.mutate({ taskid: task.id, name: taskName, color: color });
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <DialogTemplate
          title="Edit Task"
          dialogContentMethods={{
            onCloseAutoFocus: () => {
              setOpenColorPicker(false);
            },
          }}
        >
          <div className="mx-auto mt-12 flex flex-col">
            <div>
              <label className="mx-1 text-lg font-medium text-dark-500">
                Name
              </label>
              <input
                type="text"
                className="mt-3 h-12 w-full rounded-lg bg-dark-900 px-3 py-3 text-lg text-dark-500 selection:bg-primary-500 selection:text-dark-200 placeholder:text-dark-600 focus:outline-primary-500"
                placeholder={task.name}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <label className="mx-1 text-lg font-medium text-dark-500">
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
                  className="flex h-12 flex-grow rounded-lg bg-dark-900 bg-transparent px-3 py-3 text-lg text-dark-500 selection:bg-primary-500 selection:text-dark-200 placeholder:text-dark-600 focus:outline-primary-500"
                  placeholder={color.toUpperCase()}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              className="mt-12 flex h-11 items-center justify-center rounded-lg bg-primary-500 text-lg font-medium text-dark-200 transition delay-200 duration-200 ease-in-out hover:scale-105 hover:bg-primary-600"
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

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskid: string) => {
      const url = `/api/task?id=${encodeURIComponent(taskid)}`;
      const deleteTaskPromise = axios.delete(url.toString());

      const deleteTaskToast = notifyPromise(deleteTaskPromise, {
        loading: 'Deleting the task...',
        success: 'Deleted the task',
        error: (error) => getErrorMessage(error),
      });

      return deleteTaskPromise;
    },
    onSuccess: (result, taskid) => {
      deleteTaskFn(taskid);
    },
  });

  const deleteTask = () => {
    const isDemoTask = task.id.includes('demo');
    if (isDemoTask) {
      deleteTaskFn(task.id);
      notify('Deleted the demo task', 'success');
    } else {
      deleteTaskMutation.mutate(task.id);
    }

    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <DialogTemplate title="Delete Task">
          <div className="mx-auto mt-12 flex flex-col">
            <h3 className="text-center text-[22px] font-medium text-dark-300">
              Are you sure you want to delete this task?
            </h3>
            <div className="mx-6 mt-16 text-dark-500">
              <ul className="list-outside list-disc">
                <li>
                  You are deleting the task{' '}
                  <span className="text-primary-400">{task.name}</span>.
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
              className="mt-12 flex h-11 items-center justify-center rounded-lg bg-primary-500 text-lg font-medium text-dark-200 transition delay-200 duration-200 ease-in-out hover:scale-105 hover:bg-primary-600"
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
