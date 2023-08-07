import { latestTaskVersion } from '@/lib/config';
import {
  addTimestampToTask,
  clearTasks,
  getActiveTask,
  getTasks,
} from '@/lib/store/useTasks';
import { Task, TaskOnServer, TimerTimestamp } from '@/lib/types';
import { notify } from '@/utils/notify';
import { dateDifferenceInSeconds, sleep } from '@/utils/util';
import { ZodError } from 'zod';

/*
  Potentially destructive action, use with caution.
  This clears all the tasks in the user's local stores which could result in loss of progress
*/
export const fixTaskStucture = () => {
  clearTasks();
};

export const validateTaskStructure = async () => {
  await sleep(1000);
  console.log(
    '[!] Validating structure of client tasks stored in localstorage. The structure of these tasks may differ from the latest updated structure'
  );
  let activeTask = getActiveTask();
  let tasks = getTasks();
  if (activeTask == undefined) {
    const allTasks = getTasks()[0];
    if (allTasks == undefined) {
      console.log('[!] No tasks found in localstorage');
      return;
    }
  }

  try {
    tasks.forEach((task) => {
      Task.parse(activeTask);
      if (task.version !== latestTaskVersion) {
        throw new Error(
          `Version mismatch. Client is ${task.version}, latest is ${latestTaskVersion}`
        );
      }
    });

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
      notify('Your tasks are not up to date', 'failure');
      await sleep(3000);
      notify('Fetching your tasks from the server. Please refresh', 'warning');
      fixTaskStucture();
    } else {
      console.log(error);
      console.log(
        '[!] Found mismatch in local task version and latest task version.'
      );
      notify('Your tasks are not up to date', 'failure');
      await sleep(3000);
      notify('Fetching your tasks from the server. Please refresh', 'warning');
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

export const checkIfUserLacksTasks = () => {
  const tasks = getTasks();
  if (tasks.length === 0) {
    return true;
  }
  return false;
};

export const convertServerTasksToClientTasks = (
  tasksFromServer: TaskOnServer[]
): Task[] => {
  const tasks: Task[] = [];
  tasksFromServer.forEach((task) => {
    tasks.push({
      id: task.id,
      name: task.name,
      color: task.color,
      isTimerRunning: false,
      duration: 0,
      timerTimestamps: [],
      sortPriority: 0,
      version: latestTaskVersion,
    });
  });
  return tasks;
};

export const createLocalTasks = async (
  newTasks: Task[],
  addTaskToStore: (taskToAdd: Task) => void,
  setActiveTask: (id: string) => void
) => {
  let markedActiveTask = false;
  newTasks.forEach((task) => {
    if (!markedActiveTask) {
      markedActiveTask = true;
      setActiveTask(task.id);
    }
    addTaskToStore(task);
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
          const miniDuration = dateDifferenceInSeconds(
            timestamp.time,
            timestamps[index + 1].time
          );

          totalDuration += miniDuration;
        }
        if (timestamps[index + 1].type === 'play') {
          const miniDuration = dateDifferenceInSeconds(
            timestamp.time,
            new Date()
          );
          totalDuration += miniDuration;
        }
      }
      if (timestamps[index + 1] === undefined) {
        const miniDuration = dateDifferenceInSeconds(
          timestamp.time,
          new Date()
        );
        totalDuration += miniDuration;
      }
    }
  });

  return Math.floor(totalDuration);
};
