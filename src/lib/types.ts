import { z } from 'zod';

const timerTimestampTypes = z.enum(['play', 'pause']);

export const timerTimestamp = z.object({
  type: timerTimestampTypes,
  time: z.coerce.date(),
});

// ! This type is linked to the Task Schema in schemas.ts
// ! If you edit this task, the Task Schema might also need to be updated depending upon what you want to store on the database
export const Task = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  isTimerRunning: z.boolean(),
  duration: z.number(),
  timerTimestamps: z.array(timerTimestamp),
  sortPriority: z.number(),
  version: z.number(), // ! This is being used to force the client user to have the latest version of the task and also have it in sync with server. Mostly used as a fix for legacy users
});

// ! This type is linked to the TaskStrict Schema in schemas.ts
export const TaskOnServer = z.object({
  userId: z.string(),
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export type Task = z.infer<typeof Task>;
export type TaskOnServer = z.infer<typeof TaskOnServer>;
export type TimerTimestamp = z.infer<typeof timerTimestamp>;
export type TimerTimestampTypes = z.infer<typeof timerTimestampTypes>;

export interface SessionSnapshot {
  session: Task[] | null;
}
