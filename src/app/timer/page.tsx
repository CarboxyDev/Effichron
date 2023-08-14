'use client';

import { LoadingPropagateSpinner, LoadingSpinner } from '@/components/Loading';
import { PageWrapper } from '@/components/PageWrapper';
import { useAddTask, useSetActiveTask } from '@/lib/store/useTasks';
import { fetchDefaultTasks } from '@/lib/tasks/client-api';
import {
  checkIfUserLacksTasks,
  validateTaskStructure,
} from '@/lib/tasks/tasks';
import { useEffect, useState } from 'react';
import { ActionButton, TaskList, Timer } from './components';

export default function TimerPage() {
  const [loading, setLoading] = useState(false);
  const [newUserJoined, setNewUserJoined] = useState(false);
  const addTaskToStore = useAddTask();
  const setActiveTask = useSetActiveTask();

  useEffect(() => {
    validateTaskStructure();

    const userHasNoTasks = checkIfUserLacksTasks();
    if (userHasNoTasks) {
      fetchDefaultTasks({
        setLoading,
        setNewUserJoined,
        addTaskToStore,
        setActiveTask,
      });
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
          <span className="text-2xl text-primary-100">
            Generating demo tasks...
          </span>
          <div className="mt-12">
            <LoadingPropagateSpinner size={16} />
          </div>
        </div>
      )}
      {!loading && <TaskList />}
      <div className="fixed bottom-4 right-4 md:right-16 lg:right-25 2xl:right-44">
        <ActionButton />
      </div>
    </PageWrapper>
  );
}
