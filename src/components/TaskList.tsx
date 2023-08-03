'use client';

import { useStore } from '@/lib/store/useStore';
import {
  getTasks,
  useActiveTaskId,
  useChangeIfTimerRunning,
  useSetActiveTask,
} from '@/lib/store/useTasks';
import type { Task } from '@/lib/types';
import { cn, secondsToAlphaTimeFormat } from '@/utils/util';

const TaskCard = (props: { task: Task }) => {
  const task = props.task;
  const activeTaskID = useActiveTaskId();
  const changeTaskActiveState = useChangeIfTimerRunning();
  const setActiveTask = useSetActiveTask();

  const switchTask = () => {
    if (activeTaskID === undefined) {
      return;
    }
    if (activeTaskID != task.id) {
      if (activeTaskID != undefined) {
        changeTaskActiveState(activeTaskID, false);
      }
      setActiveTask(task.id);
    }
  };

  return (
    <>
      <div
        onClick={() => switchTask()}
        className={cn(
          'group h-24 w-11/12 rounded-lg border border-zinc-800 bg-zinc-900 shadow-sm transition-all delay-200 duration-300 ease-in-out hover:cursor-pointer hover:border-zinc-700 md:mx-0 md:h-28 md:w-160'
        )}
      >
        <div className="ml-5 flex h-full flex-row items-center md:ml-7">
          <div className="mr-auto flex flex-row items-center gap-x-4 md:gap-x-8">
            <div
              className="h-9 w-9 rounded-full group-hover:animate-pulse md:h-12 md:w-12"
              style={{ backgroundColor: task.color }}
            ></div>
            <div className="text-base text-zinc-300 md:text-lg">
              {task.name}
            </div>
          </div>
          <div
            className={cn(
              activeTaskID === task.id && 'hidden',
              'ml-auto mr-5 text-base text-zinc-500 md:mr-7 md:text-lg'
            )}
          >
            {secondsToAlphaTimeFormat(task.duration, true)}
          </div>
          <div
            className={cn(
              activeTaskID != task.id && 'hidden',
              'ml-auto mr-5 h-3 w-3 rounded-full bg-green-500/80 group-hover:animate-none motion-safe:animate-pulse-slow md:mr-7 md:h-4 md:w-4'
            )}
          ></div>
        </div>
      </div>
    </>
  );
};

const TaskList = (): JSX.Element => {
  console.log('Render Tasklist');
  const tasks = useStore(getTasks, (state) => state) as Task[];
  const activeTaskID = useStore(useActiveTaskId, (state) => state) as string;

  return (
    <>
      <div className="flex flex-col items-center gap-y-3">
        {tasks?.map((task) => {
          if (task.id == activeTaskID) {
            return <TaskCard key={task.id} task={task} />;
          }
        })}
        {tasks?.map((task) => {
          if (task.id != activeTaskID) {
            return <TaskCard key={task.id} task={task} />;
          }
        })}
      </div>
    </>
  );
};

export default TaskList;
