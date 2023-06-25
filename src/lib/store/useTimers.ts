import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// NOTE: task id must equal its associated timer id

interface Timer {
  id: string;
  duration: number;
  isActive: boolean;
}

interface Timers {
  timers: Timer[];
  addTimer: (timer: Timer) => void;
  removeTimer: (id: string) => void;
  updateTimer: (timer: Timer) => void;
  incrementTimer: (id: string, amount: number) => void;
}

export const useTimers = create<Timers>()(
  devtools(
    persist(
      (set) => ({
        timers: [
          {
            id: '1',
            duration: 0,
            isActive: false,
          },
        ],
        addTimer: (timer: Timer) =>
          set((state) => ({ timers: [...state.timers, timer] })),
        removeTimer: (id: string) =>
          set((state) => ({
            timers: state.timers.filter((timer) => timer.id !== id),
          })),
        updateTimer: (timer: Timer) =>
          set((state) => ({
            timers: state.timers.map((t) => (t.id === timer.id ? timer : t)),
          })),
        incrementTimer: (id: string, amount: number) =>
          set((state) => ({
            timers: state.timers.map((t) =>
              t.id === id ? { ...t, duration: t.duration + amount } : t
            ),
          })),
      }),
      { name: 'timers' }
    )
  )
);
