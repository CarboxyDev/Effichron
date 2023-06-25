'use client';

import { Task } from '@/lib/types';
import { useStore } from '@/lib/store/useStore';
import { TaskListStore, useTasks } from '@/lib/store/useTasks';
import { cn, secondsToAlphaTimeFormat } from '@/utils/util';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const hardcodedTasks: Task[] = [
  {
    id: uuid(),
    name: 'Work',
    color: '#06b6d4',
    isActive: true,
    duration: 0,
  },
  {
    id: uuid(),
    name: 'Learn',
    color: '#a78bfa',
    isActive: false,
    duration: 0,
  },
];

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
            {task.isActive ? 'active' : secondsToAlphaTimeFormat(task.duration)}
          </div>
        </div>
      </div>
    </>
  );
};

const TaskList = (): JSX.Element => {
  console.log('Render TaskList');
  const taskStore = useStore(useTasks, (state) => state);
  const tasks = taskStore?.tasks;

  useEffect(() => {
    console.log(tasks);

    // Match against Name not ID
    const checkIfTaskExists = (task: Task): boolean => {
      console.log('checkIfTaskExists');
      console.log(tasks);
      tasks?.forEach((t) => {
        console.log('fe');
        if (t.name === task.name) {
          console.log('matched ', t.name);
          return true;
        }
      });
      return false;
    };

    // TODO: Checking for already existing tasks is not working. Fix it later.
    // Probably has something to with tasks being useEffect dependency

    if (checkIfTaskExists(hardcodedTasks[0])) {
      console.log('Task 0 exists');
    } else {
      console.log('Task 0 does not exist');
      //taskStore?.addTask(hardcodedTasks[0]);
    }
    // Add hardcoded tasks to store
    //taskStore?.addTask(hardcodedTasks[0]);
    //taskStore?.addTask(hardcodedTasks[1]);
    //taskStore?.clear();
  }, [taskStore, tasks]);

  return (
    <>
      <div className="gap-y-4 flex flex-col items-center">
        {tasks?.map((task) => (
          <Task key={task.id} task={task} taskStore={taskStore} />
        ))}
      </div>
    </>
  );
};

export default TaskList;
