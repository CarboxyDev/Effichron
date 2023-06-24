import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Timer {
  duration: number;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  setDuration: (timeInSeconds: number) => void;
  increment: (amount: number) => void;
  reset: () => void;
}

interface Timers {
  timers: Timer[];
}

export const useTimers = create<Timers>()(
  persist(
    (set) => ({
      timers: [],
    }),
    { name: 'timers' }
  )
);
