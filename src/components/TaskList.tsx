'use client';

import { Task } from '@/lib/types';
import { useStore } from '@/lib/store/useStore';
import { TaskListStore, useTasks } from '@/lib/store/useTasks';
import { cn, secondsToAlphaTimeFormat } from '@/utils/util';

const Task = (props: { task: Task; taskStore: TaskListStore | undefined }) => {
  const { task, taskStore } = props;

  const switchTask = () => {
    if (taskStore === undefined) {
      return;
    }
    if (taskStore.activeTask != task.id) {
      if (taskStore.activeTask != undefined) {
        taskStore.changeActiveState(taskStore.activeTask, false);
      }

      taskStore.setActiveTask(task.id);
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
        <div className="mx-7 flex items-center flex-row h-full">
          <div className="mr-auto flex flex-row gap-x-8 items-center">
            <div
              className="h-12 w-12 rounded-full group-hover:animate-pulse"
              style={{ backgroundColor: task.color }}
            ></div>
            <div className="text-zinc-300 text-xl">{task.name}</div>
          </div>
          <div className="ml-auto text-zinc-400 text-lg">
            {taskStore?.activeTask == task.id
              ? 'active'
              : secondsToAlphaTimeFormat(task.duration)}
          </div>
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
            return <Task key={task.id} task={task} taskStore={taskStore} />;
          }
        })}
        {tasks?.map((task) => {
          if (task.id != taskStore?.activeTask) {
            return <Task key={task.id} task={task} taskStore={taskStore} />;
          }
        })}
      </div>
    </>
  );
};

export default TaskList;
