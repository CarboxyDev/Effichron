import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerID {
  id: string;
}

interface DynamicTimer {
  timers: TimerID[];
  addTimer: (id: string) => void;
  removeTimer: (id: string) => void;
}

export const useDynamicTimer = create<DynamicTimer>()(
  persist(
    (set) => ({
      timers: [],
      addTimer: (id: string) =>
        set((state) => ({ timers: [...state.timers, { id }] })),
      removeTimer: (id: string) =>
        set((state) => ({
          timers: state.timers.filter((timer) => timer.id !== id),
        })),
    }),
    { name: 'dynamicTimer' }
  )
);
