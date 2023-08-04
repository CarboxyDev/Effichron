import {
  addTimestampToTask,
  getActiveTask,
  getDefaultTasks,
  getTasks,
} from '@/lib/store/useTasks';
import { Task, TimerTimestamp } from '@/lib/types';
import { notify } from '@/utils/notify';
import { dateDifferenceInSeconds, sleep } from '@/utils/util';
import { ZodError } from 'zod';

/*
  Potentially destructive action, use with caution.
  This clears all the tasks in the user's localstorage and replaces them with the default tasks
*/
export const fixTaskStucture = () => {
  const defaultTasks = getDefaultTasks();
  localStorage.setItem('tasks', JSON.stringify(defaultTasks));
};

export const validateTaskStructure = async () => {
  await sleep(1000);
  console.log(
    '[!] Validating structure of client tasks stored in localstorage. The structure of these tasks may differ from the latest updated structure'
  );
  let activeTask = getActiveTask();
  if (activeTask == undefined) {
    activeTask = getTasks()[0];
  }

  try {
    Task.parse(activeTask);
    console.log(
      '[!] Structure of local tasks is up-to-date with latest structure.'
    );
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      /*
        This is not ideal and will probably be used very rarely as the task structure would not change often.
        It is more meant to be used as a legacy fix for users who used the app during stages of heavy development.
        Anyways, this is potentially destructive as it resets all the user's tasks without their permission.
      */
      console.log(
        '[!] Found mismatch in local task structure and latest task structure.'
      );
      console.log('Your task structure: ', activeTask);
      notify('Your tasks are not up to date', 'failure');
      await sleep(3000);
      notify('Resetting to default tasks. Please refresh.', 'warning');
      pauseAllTasks();
      fixTaskStucture();
    }
  }
};

export const pauseAllTasks = () => {
  const tasks = getTasks();
  tasks.forEach((task) => {
    if (task.isTimerRunning) {
      addTimestampToTask(task.id, 'pause', new Date());
      task.isTimerRunning = false;
    }
  });
};

// ! This needs to handle all the corner cases
export const calculateTimerDuration = (
  timestamps: TimerTimestamp[]
): number => {
  let totalDuration = 0;
  timestamps.forEach((timestamp, index) => {
    if (timestamp.time === null) throw new Error('Timestamp time is null');
    if (timestamp.type === 'play') {
      if (timestamps[index + 1] !== undefined) {
        if (timestamps[index + 1].time === null)
          throw new Error('Timestamp + 1 time is null');
        if (timestamps[index + 1].type === 'pause') {
          // ! This has the issue
          const miniDuration = dateDifferenceInSeconds(
            timestamp.time,
            timestamps[index + 1].time
          );
          if (isNaN(miniDuration)) {
            console.log(timestamp.time);
            console.log(timestamps[index + 1].time);
          }
          console.log('Mini duration 1: ', miniDuration);
          totalDuration += miniDuration;
        }
        if (timestamps[index + 1].type === 'play') {
          const miniDuration = dateDifferenceInSeconds(
            timestamp.time,
            new Date()
          );
          console.log('Mini duration 2: ', miniDuration);
          totalDuration += miniDuration;
        }
      }
      if (timestamps[index + 1] === undefined) {
        const miniDuration = dateDifferenceInSeconds(
          timestamp.time,
          new Date()
        );
        console.log('Mini duration 3: ', miniDuration);
        totalDuration += miniDuration;
      }
    }
  });

  console.log('Total duration: ', totalDuration);
  return Math.ceil(totalDuration);
};
