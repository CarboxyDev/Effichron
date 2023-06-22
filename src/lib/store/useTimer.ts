import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Timer {
  duration: number;
  increment: (amount: number) => void;
  reset: () => void;
}

export const useTimer = create<Timer>()(
  persist(
    (set) => ({
      duration: 0,
      increment: (amount: number) =>
        set((state) => ({ duration: state.duration + amount })),
      reset: () => set({ duration: 0 }),
    }),
    { name: 'timer' }
  )
);
