'use client';

import { Task } from '@/lib/types';
import { useStore } from '@/lib/store/useStore';
import { useTasks } from '@/lib/store/useTasks';
import { cn } from '@/utils/util';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useTimers } from '@/lib/store/useTimers';

const hardcodedTasks: Task[] = [
  {
    id: uuid(),
    name: 'Work',
    color: '#06b6d4',
    isActive: true,
  },
  {
    id: uuid(),
    name: 'Learn',
    color: '#a78bfa',
    isActive: false,
  },
];

const Task = (props: { task: Task }): JSX.Element => {
  const { task } = props;

  const switchTask = () => {
    console.log('switchTask');
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
          <div className="ml-auto text-zinc-400 text-lg">1h 23m</div>
        </div>
      </div>
    </>
  );
};

const TaskList = (): JSX.Element => {
  console.log('Render TaskList');
  const taskStore = useStore(useTasks, (state) => state);
  const timersStore = useStore(useTimers, (state) => state);
  const tasks = taskStore?.tasks;

  useEffect(() => {
    console.log('useEffect TaskList');
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

    // Create associated timers for each task if they don't already exist
    // Maybe I could just not have this here and just create timer when the task is created mhmmmm
    // This code below under this useEffect is kind of useless for now I guess
    const timerForTaskExists = (task: Task): boolean => {
      const timers = timersStore?.timers;
      let foundTimer = false;

      timers?.forEach((timer) => {
        if (timer.id == task.id) {
          foundTimer = true;
        }
      });
      return foundTimer;
    };

    console.log('Running forEach on tasks');
    tasks?.forEach((task: Task) => {
      console.log(timerForTaskExists(task));
      if (!timerForTaskExists(task)) {
        //
      }
    });
  }, [taskStore, tasks, timersStore]);

  return (
    <>
      <div className="gap-y-4 flex flex-col items-center">
        {tasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </>
  );
};

export default TaskList;
