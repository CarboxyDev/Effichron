const TaskList = () => {
  const tasks = [
    {
      id: 1,
      name: 'Work',
    },
    {
      id: 2,
      name: 'Learn',
    },
  ];

  return (
    <>
      <div className="gap-y-8 flex flex-col items-center">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="w-96 h-40 border rounded-xl border-zinc-700"
          >
            <span className="font-semibold text-xl text-blue-400">
              {task.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;
