'use client';

import { LoadingPropagateSpinner, LoadingSpinner } from '@/components/Loading';
import { PageWrapper } from '@/components/PageWrapper';
import { useAddTask, useSetActiveTask } from '@/lib/store/useTasks';
import {
  checkIfUserLacksTasks,
  convertServerTasksToClientTasks,
  createLocalTasks,
  getDemoTasks,
  validateTaskStructure,
} from '@/lib/tasks/tasks';
import { TaskOnServer } from '@/lib/types';
import { getErrorMessage } from '@/utils/api';
import { notify } from '@/utils/notify';
import { sleep } from '@/utils/util';
import { useEffect, useState } from 'react';
import { ActionButton, TaskList, Timer } from './components';

export default function TimerPage() {
  const [loading, setLoading] = useState(false);
  const [newUserJoined, setNewUserJoined] = useState(false);
  const addTaskToStore = useAddTask();
  const setActiveTask = useSetActiveTask();

  useEffect(() => {
    validateTaskStructure();

    const fetchDefaultTasks = async () => {
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

    const noTasks = checkIfUserLacksTasks();
    if (noTasks) {
      fetchDefaultTasks();
    }
  }, [addTaskToStore, setActiveTask]);

  return (
    <PageWrapper
      navbarProps={{ variant: 'with-minimal-branding', drawDivider: true }}
    >
      <div className="mt-24 md:mt-48"></div>
      <Timer />
      <div className="mt-24"></div>
      {loading && !newUserJoined && (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {loading && newUserJoined && (
        <div className="flex flex-col items-center justify-center">
          <span className="text-2xl text-violet-100">
            Generating demo tasks...
          </span>
          <div className="mt-12">
            <LoadingPropagateSpinner size={16} />
          </div>
        </div>
      )}
      {!loading && <TaskList />}
      <div className="fixed bottom-4 right-4">
        <ActionButton />
      </div>
    </PageWrapper>
  );
}
