interface Task {
  id: number;
  name: string;
  color: string;
}

const tasks: Task[] = [
  {
    id: 1,
    name: 'Work',
    color: '#06b6d4',
  },
  {
    id: 2,
    name: 'Learn',
    color: '#a78bfa',
  },
];

const Task = (props: { task: Task }): JSX.Element => {
  const { task } = props;

  return (
    <>
      <div className="w-160 h-32 rounded-lg bg-zinc-800">
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

const TaskList = () => {
  return (
    <>
      <div className="gap-y-6 flex flex-col items-center">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </>
  );
};

export default TaskList;
