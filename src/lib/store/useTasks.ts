import { Task } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';

interface TaskList {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
  clear: () => void;
}

export const useTasks = create<TaskList>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: '1',
          name: 'Work',
          color: '#06b6d4',
          isActive: true,
        },
        {
          id: '2',
          name: 'Learn',
          color: '#a78bfa',
          isActive: false,
        },
      ],
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
      clear: () => set({ tasks: [] }),
    }),
    { name: 'tasks' }
  )
);
