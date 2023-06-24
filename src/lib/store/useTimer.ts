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

export const useTimer = create<Timer>()(
  persist(
    (set) => ({
      duration: 0,
      isActive: false,
      setIsActive: (isActive: boolean) => set((state) => ({ isActive })),
      setDuration: (timeInSeconds: number) =>
        set((state) => ({ duration: timeInSeconds })),
      increment: (amount: number) =>
        set((state) => ({ duration: state.duration + amount })),
      reset: () => set({ duration: 0 }),
    }),
    { name: 'timer' }
  )
);
