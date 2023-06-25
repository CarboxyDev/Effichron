'use client';

import { useStore } from '@/lib/store/useStore';
import { secondsToTimeFormat } from '@/utils/util';
import { useEffect, useState } from 'react';
import TimeDisplay from './TimeDisplay';
import { useTasks } from '@/lib/store/useTasks';
import { Task } from '@/lib/types';

const Timer = () => {
  const taskStore = useStore(useTasks, (state) => state);
  const tasks = taskStore?.tasks;
  const [activeIdentifier, setActiveIdentifier] = useState<string>('');
  const [activeTask, setActiveTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    const getActiveTask = (): Task | undefined => {
      const _activeTask = tasks?.find((task) => {
        return task.isActive;
      });

      return _activeTask;
    };

    setActiveTask(getActiveTask());
    setActiveIdentifier(activeTask?.id as string);

    const clientCalculateTime = setInterval(() => {
      if (activeTask?.isActive) {
        taskStore?.incrementDuration(activeTask.id, 1);
      }
    }, 1000);

    return () => clearInterval(clientCalculateTime);
  }, [activeIdentifier, taskStore, tasks, activeTask]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <TimeDisplay time={secondsToTimeFormat(activeTask?.duration || 0)} />
      </div>
      <div className="mt-4 gap-x-2 flex flex-row">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => {}}
        >
          {activeTask?.isActive ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default Timer;
