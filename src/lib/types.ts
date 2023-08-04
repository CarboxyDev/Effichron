import { z } from 'zod';

const timerTimestampTypes = z.enum(['play', 'pause']);

export const timerTimestamp = z.object({
  type: timerTimestampTypes,
  time: z.coerce.date(),
});

export const Task = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  isTimerRunning: z.boolean(),
  duration: z.number(),
  timerTimestamps: z.array(timerTimestamp),
  sortPriority: z.number(),
});

export type Task = z.infer<typeof Task>;
export type TimerTimestamp = z.infer<typeof timerTimestamp>;
export type TimerTimestampTypes = z.infer<typeof timerTimestampTypes>;

export interface SessionSnapshot {
  session: Task[] | null;
}
