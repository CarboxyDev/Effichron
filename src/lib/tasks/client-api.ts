import { getErrorMessage } from '@/utils/api';
import { notify } from '@/utils/notify';
import { sleep } from '@/utils/util';
import { Dispatch, SetStateAction } from 'react';
import { Task, TaskOnServer } from '../types';
import {
  convertServerTasksToClientTasks,
  createLocalTasks,
  getDemoTasks,
} from './tasks';

interface fetchDefaultTasksArgs {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setNewUserJoined: Dispatch<SetStateAction<boolean>>;
  addTaskToStore: (taskToAdd: Task) => void;
  setActiveTask: (id: string) => void;
}

/**
 * This method fetches the default tasks for logged in users when they have no tasks in their local store.
 */
export const fetchDefaultTasks = async (args: fetchDefaultTasksArgs) => {
  const { setLoading, setNewUserJoined, addTaskToStore, setActiveTask } = args;

  setLoading(true);
  const fetchTasks = await fetch('/api/task?default=true')
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        const errorMessage = await res.json();
        throw Error(errorMessage);
      }
    })
    .then(async (data) => {
      const tasksFromServer = JSON.parse(data) as TaskOnServer[];
      const newTasks = convertServerTasksToClientTasks(tasksFromServer);
      await createLocalTasks(newTasks, addTaskToStore, setActiveTask);
      setLoading(false);
    })
    .catch(async (error) => {
      const errorMessage = getErrorMessage(error);
      // ! Temporary shortcut, Will handle this better in the future
      if (errorMessage.startsWith('You have to be logged in')) {
        /**
         * This code always runs when a new user (who hasn't logged in) visits the timer
         */
        setNewUserJoined(true);
        await sleep(3000);
        const demoTasks = getDemoTasks();
        await createLocalTasks(demoTasks, addTaskToStore, setActiveTask);
        setLoading(false);
      } else {
        notify(errorMessage, 'failure');
        await sleep(2000);
        notify('Please try refreshing', 'warning');
      }
    });
};
