'use client';
import { useStore } from '@/lib/store/useStore';
import { useTasks } from '@/lib/store/useTasks';

// NOTE: Maybe use an icon to convey meaning of the button instead of two words of text

const SaveSessionButton = () => {
  const taskStore = useStore(useTasks, (state) => state);

  const saveSession = (): void => {
    // TODO: Take a snapshot of the task store and upload to database
    // Convey success via popup/toast and only after that reset the local session
    taskStore?.refreshTasks();
  };

  return (
    <>
      <button
        onClick={() => saveSession()}
        className="w-32 py-2 bg-blue-500 text-zinc-200 rounded-md hover:cursor-pointer hover:bg-blue-400 transition duration-300 ease-in-out active:scale-105"
      >
        Save session
      </button>
    </>
  );
};

export default SaveSessionButton;
