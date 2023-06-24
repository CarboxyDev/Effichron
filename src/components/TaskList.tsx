'use client';

import { useStore } from '@/lib/store/useStore';
import { useTasks } from '@/lib/store/useTasks';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

interface Task {
  id: string;
  name: string;
  color: string;
}

const hardcodedTasks: Task[] = [
  {
    id: uuid(),
    name: 'Work',
    color: '#06b6d4',
  },
  {
    id: uuid(),
    name: 'Learn',
    color: '#a78bfa',
  },
];

const Task = (props: { task: Task }): JSX.Element => {
  const { task } = props;

  return (
    <>
      <div className="w-160 h-28 rounded-lg bg-zinc-800">
        <div className="mx-7 flex items-center flex-row h-full">
          <div className="mr-auto flex flex-row gap-x-8 items-center">
            <div
              className="h-12 w-12 rounded-full"
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
  }, [taskStore, tasks]);

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
