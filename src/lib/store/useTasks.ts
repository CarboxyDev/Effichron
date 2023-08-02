import { Task } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TaskListStore {
  tasks: Task[];
  activeTask: string | undefined; // id of the active task
  setActiveTask: (id: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
  incrementDuration: (id: string, amount: number) => void;
  changeIfTimerRunning: (id: string, isActive: boolean) => void;
  refreshTasks: () => void; // Sets duration and isTimerRunning of Task to default (0 and false)
  resetActiveTask: () => void;
  clear: () => void;
}

const defaultTasks: Task[] = [
  {
    id: '1',
    name: 'Work',
    color: '#06b6d4',
    isTimerRunning: false,
    duration: 0,
    lastStartTime: null,
    sortPriority: 0,
  },
  {
    id: '2',
    name: 'Learn',
    color: '#a78bfa',
    isTimerRunning: false,
    duration: 0,
    lastStartTime: null,
    sortPriority: 1,
  },
];

export const useTasks = create<TaskListStore>()(
  persist(
    (set) => ({
      tasks: defaultTasks,
      activeTask: '1',
      setActiveTask: (id: string) => set({ activeTask: id }),
      addTask: (task: Task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      deleteTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTask: (task: Task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
      incrementDuration: (id: string, amount: number) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, duration: t.duration + amount } : t
          ),
        })),
      changeIfTimerRunning: (id: string, isTimerRunning: boolean) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, isTimerRunning } : t
          ),
        })),
      refreshTasks: () =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            true ? { ...t, duration: 0, isTimerRunning: false } : t
          ),
        })),
      resetActiveTask: () => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === state.activeTask ? { ...t, duration: 0 } : t
          ),
        }));
      },
      clear: () => set({ tasks: [] }),
    }),
    { name: 'tasks' }
  )
);

// NOTE: Maybe use our own useStore hook for wrapping these hooks in a useEffect?

export const useGetTasks = () => {
  const _tasks = useTasks((state) => state.tasks);
  return _tasks;
};

export const useActiveTask = () => {
  const activeTask = useTasks((state) =>
    state.tasks.find((task) => task.id === state.activeTask)
  );
  return activeTask;
};

export const useActiveTaskId = () => {
  const activeTaskId = useTasks((state) => state.activeTask);
  return activeTaskId;
};

export const useRefreshTasks = () => {
  const refreshTasks = useTasks((state) => state.refreshTasks);
  return refreshTasks;
};

export const useChangeIfTimerRunning = () => {
  const changeFn = useTasks((state) => state.changeIfTimerRunning);
  return changeFn;
};

export const useSetActiveTask = () => {
  const setActiveTask = useTasks((state) => state.setActiveTask);
  return setActiveTask;
};

export const useResetActiveTask = () => {
  const resetActiveTask = useTasks((state) => state.resetActiveTask);
  return resetActiveTask;
};

export const useAddTask = () => {
  const _addTask = useTasks((state) => state.addTask);
  return _addTask;
};

export const useUpdateTask = () => {
  const _updateTask = useTasks((state) => state.updateTask);
  return _updateTask;
};

export const useDeleteTask = () => {
  const _deleteTask = useTasks((state) => state.deleteTask);
  return _deleteTask;
};

/* Non-reactive states, do not use as hooks */

export const getTasks = () => {
  const _tasks = useTasks.getState().tasks;
  return _tasks;
};

export const getActiveTask = () => {
  const activeTask = useTasks
    .getState()
    .tasks.find((task) => task.id === useTasks.getState().activeTask);
  return activeTask;
};

/*
  Potentially destructive action, use with caution.
  This clears all the tasks in the user's localstorage and replaces them with the default tasks
*/

export const fixTaskStructure = () => {
  useTasks.getState().clear();
  useTasks.getState().tasks = defaultTasks;
};
