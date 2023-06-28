'use client';

import { Task } from '@/lib/types';
import { useStore } from '@/lib/store/useStore';
import {
  useActiveTaskId,
  useChangeTaskActiveState,
  useSetActiveTask,
  useTasks,
} from '@/lib/store/useTasks';
import { cn, secondsToAlphaTimeFormat } from '@/utils/util';

const Task = (props: { task: Task }) => {
  const task = props.task;
  const activeTaskID = useActiveTaskId();
  const changeTaskActiveState = useChangeTaskActiveState();
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
          'w-160 h-28 rounded-lg bg-zinc-800 hover:bg-zinc-900 hover:cursor-pointer group hover:border hover:border-zinc-800 border border-transparent transition ease-in duration-200 delay-75'
        )}
      >
        <div className="ml-7 flex items-center flex-row h-full">
          <div className="mr-auto flex flex-row gap-x-8 items-center">
            <div
              className="h-12 w-12 rounded-full group-hover:animate-pulse"
              style={{ backgroundColor: task.color }}
            ></div>
            <div className="text-zinc-300 text-xl">{task.name}</div>
          </div>
          <div className="ml-auto text-zinc-400 text-lg mr-7">
            {activeTaskID == task.id
              ? 'active'
              : secondsToAlphaTimeFormat(task.duration)}
          </div>
          <div
            className={cn(
              task.id != activeTaskID && 'hidden',
              'w-2 h-full bg-emerald-400 rounded-r-lg'
            )}
          ></div>
        </div>
      </div>
    </>
  );
};

const TaskList = (): JSX.Element => {
  // This re-renders every time the taskStore is modified (which is every second) which is rather bad for performance
  // Try optimizing this in the future so that it only renders when absolutely needed
  console.log('Render TaskList');
  const taskStore = useStore(useTasks, (state) => state);
  const tasks = taskStore?.tasks;

  return (
    <>
      <div className="gap-y-4 flex flex-col items-center">
        {tasks?.map((task) => {
          if (task.id == taskStore?.activeTask) {
            return <Task key={task.id} task={task} />;
          }
        })}
        {tasks?.map((task) => {
          if (task.id != taskStore?.activeTask) {
            return <Task key={task.id} task={task} />;
          }
        })}
      </div>
    </>
  );
};

export default TaskList;
