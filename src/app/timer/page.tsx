'use client';

import Footer from '@/components/Footer';
import { LoadingPropagateSpinner, LoadingSpinner } from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { CONFIG } from '@/lib/config';
import { useAddTask, useSetActiveTask } from '@/lib/store/useTasks';
import {
  checkIfUserLacksTasks,
  convertServerTasksToClientTasks,
  createLocalTasks,
  validateTaskStructure,
} from '@/lib/tasks/tasks';
import { TaskOnServer } from '@/lib/types';
import { getErrorMessage } from '@/utils/api';
import { notify } from '@/utils/notify';
import { sleep } from '@/utils/util';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ActionButton, TaskList, Timer } from './components';

export default function TimerPage() {
  const [loading, setLoading] = useState(false);
  const [newUserJoined, setNewUserJoined] = useState(false);
  const addTaskToStore = useAddTask();
  const setActiveTask = useSetActiveTask();
  const router = useRouter();

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
            /*
             * This code always runs when a new user (who hasn't logged in) visits the timer
             */
            setLoading(false);
            setNewUserJoined(true);
            try {
              await sleep(5000);
              router.push(CONFIG.SIGN_IN_URL);
            } catch (error) {
              console.log(error);
            }
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
  }, [addTaskToStore, setActiveTask, router]);

  return (
    <main className="flex flex-col">
      <Toaster position="top-left" />
      <Navbar />
      <div className="mt-24 md:mt-40">
        {newUserJoined && (
          <div className="flex flex-col items-center justify-center">
            <div className="mb-24 text-3xl text-zinc-200">
              Redirecting you to sign in..
            </div>
            <LoadingPropagateSpinner size={16} />
          </div>
        )}
        {!newUserJoined && (
          <>
            <Timer />
            <div className="mt-24"></div>
            {loading && !newUserJoined && (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            )}
            {!loading && !newUserJoined && <TaskList />}
            <div className="mt-24"></div>
            <div className="fixed bottom-4 right-4">
              <ActionButton />
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
