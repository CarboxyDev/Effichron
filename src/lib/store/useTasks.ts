import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Task {
  id: string;
  name: string;
  color: string;
}

interface TaskList {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
}

export const useTasks = create<TaskList>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task: Task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTask: (task: Task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
    }),
    { name: 'tasks' }
  )
);
