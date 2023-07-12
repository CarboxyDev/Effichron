'use client';

import { useStore } from '@/lib/store/useStore';
import { secondsToTimeFormat } from '@/utils/util';
import { useEffect, useState } from 'react';
import TimeDisplay from './TimeDisplay';
import { useTasks } from '@/lib/store/useTasks';
import { Task } from '@/lib/types';
import { Icon } from '@iconify/react';

const Timer = () => {
  const taskStore = useStore(useTasks, (state) => state);
  const [activeTask, setActiveTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    const tasks = taskStore?.tasks;

    const getActiveTask = (): Task | undefined => {
      const activeTaskID = taskStore?.activeTask;
      const _activeTask = tasks?.find((t) => {
        return t.id === activeTaskID;
      });

      return _activeTask;
    };

    setActiveTask(getActiveTask());

    const clientCalculateTime = setInterval(() => {
      if (activeTask?.isActive) {
        taskStore?.incrementDuration(activeTask.id, 1);
      }
    }, 1000);

    return () => clearInterval(clientCalculateTime);
  }, [taskStore, activeTask]);

  const toggleTaskTimer = (): void => {
    if (activeTask == undefined || taskStore == undefined) {
      return;
    }

    taskStore.changeActiveState(activeTask.id, !activeTask.isActive);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <TimeDisplay time={secondsToTimeFormat(activeTask?.duration || 0)} />
      </div>
      <div className="mt-12 flex flex-row gap-x-2">
        <button
          className="flex h-16 w-16 items-center justify-center rounded-full border border-transparent bg-zinc-900 text-zinc-400 transition delay-300 duration-500 ease-in-out hover:border-zinc-800 hover:text-zinc-600"
          onClick={() => toggleTaskTimer()}
        >
          {activeTask?.isActive ? (
            <Icon icon="ph:pause-fill" className="h-6 w-6" />
          ) : (
            <Icon icon="ph:play-fill" className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Timer;
