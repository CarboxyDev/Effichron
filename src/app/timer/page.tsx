'use client';

import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { useAddTask, useSetActiveTask } from '@/lib/store/useTasks';
import { TaskOnServer } from '@/lib/types';
import { getErrorMessage } from '@/utils/api';
import { notify } from '@/utils/notify';
import { sleep } from '@/utils/util';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ActionButton, TaskList, Timer } from './components';
import {
  checkIfUserLacksTasks,
  convertServerTasksToClientTasks,
  createLocalTasks,
  validateTaskStructure,
} from './helpers';

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
            /*
             * This code always runs when a new user (who hasn't logged in) visits the timer
             */
            setLoading(false);
            setNewUserJoined(true);
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
    <main className="flex flex-col">
      <Toaster position="top-left" />
      <Navbar />
      <div className="mt-24 md:mt-40">
        <Timer />
        <div className="mt-24"></div>
        {loading && !newUserJoined && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}
        {!loading && !newUserJoined && <TaskList />}
        {newUserJoined && (
          <>
            <div className="flex justify-center text-lg text-zinc-300">
              <Link
                href={'/api/auth/signin'}
                className="text-violet-500 underline"
              >
                Please sign in to use the timer
              </Link>
            </div>
          </>
        )}
        <div className="mt-24"></div>
        <div className="fixed bottom-4 right-4">
          <ActionButton />
        </div>
      </div>
      <Footer />
    </main>
  );
}
