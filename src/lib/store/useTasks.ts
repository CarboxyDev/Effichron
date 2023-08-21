import { Task, TimerTimestampTypes } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TaskListStore {
  tasks: Task[];
  activeTask: string | undefined; // id of the active task
  setActiveTask: (id: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
  setDuration: (id: string, duration: number) => void;
  changeIfTimerRunning: (id: string, isActive: boolean) => void;
  addTimestamp: (type: TimerTimestampTypes, timestamp: Date) => void; // add a timestamp record (start/pause) to active task
  refreshTasks: () => void; // Sets duration and isTimerRunning of Task to default (0 and false)
  resetActiveTask: () => void;
  pauseActiveTask: () => void;
  clear: () => void;
}

export const useTasks = create<TaskListStore>()(
  persist(
    (set) => ({
      tasks: [],
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
      setDuration: (id: string, duration: number) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, duration } : t)),
        })),
      changeIfTimerRunning: (id: string, isTimerRunning: boolean) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, isTimerRunning } : t
          ),
        })),
      // ! NOTE: This only adds timestamps to the active task so the active task's id is not needed
      addTimestamp: (type: TimerTimestampTypes, timestamp: Date) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === state.activeTask
              ? {
                  ...t,
                  timerTimestamps: [
                    ...t.timerTimestamps,
                    { type, time: timestamp },
                  ],
                }
              : t
          ),
        })),
      refreshTasks: () =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            true
              ? {
                  ...t,
                  duration: 0,
                  isTimerRunning: false,
                  timerTimestamps: [],
                }
              : t
          ),
        })),
      resetActiveTask: () => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === state.activeTask
              ? { ...t, duration: 0, timerTimestamps: [] }
              : t
          ),
        }));
      },
      clear: () => set({ tasks: [] }),
      pauseActiveTask: () => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === state.activeTask ? { ...t, isTimerRunning: false } : t
          ),
        }));
      },
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

export const useAddTimestamp = () => {
  const addTimestamp = useTasks((state) => state.addTimestamp);
  return addTimestamp;
};

export const useSetActiveTask = () => {
  const setActiveTask = useTasks((state) => state.setActiveTask);
  return setActiveTask;
};

export const useResetActiveTask = () => {
  const resetActiveTask = useTasks((state) => state.resetActiveTask);
  return resetActiveTask;
};

export const usePauseActiveTask = () => {
  const pauseActiveTask = useTasks((state) => state.pauseActiveTask);
  return pauseActiveTask;
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

export const useSetDuration = () => {
  const _setDuration = useTasks((state) => state.setDuration);
  return _setDuration;
};

// ! Non-reactive states, do not use as hooks

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

export const getDeleteTaskFn = () => {
  const _deleteTask = useTasks.getState().deleteTask;
  return _deleteTask;
};

export const clearTasks = () => {
  useTasks.setState({ tasks: [] });
};

export const addTimestampToTask = (
  id: string,
  type: TimerTimestampTypes,
  timestamp: Date
) => {
  useTasks.getState().tasks.forEach((task) => {
    if (task.id === id) {
      task.timerTimestamps.push({ type, time: timestamp });
    }
  });
};
