import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// NOTE: task id must equal its associated timer id

interface Timer {
  id: string;
  duration: number;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  setDuration: (timeInSeconds: number) => void;
  increment: (amount: number) => void;
  reset: () => void;
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
        timers: [],
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
