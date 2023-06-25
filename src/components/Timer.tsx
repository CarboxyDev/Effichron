'use client';

import { useStore } from '@/lib/store/useStore';
import { secondsToTimeFormat } from '@/utils/util';
import { useEffect, useState } from 'react';
import TimeDisplay from './TimeDisplay';
import { useTasks } from '@/lib/store/useTasks';
import { Task } from '@/lib/types';

const Timer = () => {
  const taskStore = useStore(useTasks, (state) => state);
  const [activeIdentifier, setActiveIdentifier] = useState<string>('');
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
    setActiveIdentifier(activeTask?.id as string);

    const clientCalculateTime = setInterval(() => {
      if (activeTask?.isActive) {
        taskStore?.incrementDuration(activeTask.id, 1);
      }
    }, 1000);

    return () => clearInterval(clientCalculateTime);
  }, [activeIdentifier, taskStore, activeTask]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <TimeDisplay time={secondsToTimeFormat(activeTask?.duration || 0)} />
      </div>
      <div className="mt-8 gap-x-2 flex flex-row">
        <button
          className="w-32 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => {}}
        >
          {activeTask?.isActive ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default Timer;
