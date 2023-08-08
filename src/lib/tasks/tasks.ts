import { clearTasks, getTasks } from '../store/useTasks';
import { Task } from '../types';

export const retainTaskProgress = (serverTasks: Task[]): Task[] => {
  const localTasks = getTasks();
  const updatedTasks = serverTasks.map((task) => {
    const localTask = localTasks.find((t) => t.id === task.id);
    if (localTask) {
      console.log(localTask.duration);
      return {
        ...task,
        duration: localTask.duration,
        timerTimestamps: localTask.timerTimestamps,
      };
    }
    return task;
  });

  return updatedTasks;
};

/**
  ! Potentially destructive action, use with caution.
  This clears all the tasks in the user's local stores which could result in loss of progress
*/
export const clearLocalTasks = (): void => {
  clearTasks();
};
