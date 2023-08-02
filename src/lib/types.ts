import { z } from 'zod';

export const Task = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  isTimerRunning: z.boolean(),
  duration: z.number(),
  lastStartTime: z.date().nullable(),
  sortPriority: z.number(),
});

export type Task = z.infer<typeof Task>;

export interface SessionSnapshot {
  session: Task[] | null;
}
