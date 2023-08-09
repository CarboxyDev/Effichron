import { Task } from '@/lib/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { DeleteTaskDialog, EditTaskDialog } from './dialogs';

export interface TaskDropdownMenuProps {
  task: Task;
  actions: {
    deleteFn: (id: string) => void;
  };
}

export const TaskDropdownMenu = (props: TaskDropdownMenuProps) => {
  const { task } = props;
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);

  return (
    <>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={0}
          className="flex w-30 select-none flex-col items-center rounded-lg border border-dark-800 bg-dark-900 shadow-xl"
        >
          <EditTaskDialog
            task={task}
            open={editTaskOpen}
            setOpen={setEditTaskOpen}
            trigger={
              <DropdownMenu.Item
                className="w-full flex-1 rounded-t-lg border-b border-b-dark-800 py-3 text-center text-dark-300 transition delay-200 duration-300 ease-in-out hover:cursor-pointer hover:bg-dark-800 focus:outline-none"
                onSelect={(event) => {
                  event.preventDefault();
                  setEditTaskOpen(true);
                }}
              >
                Edit
              </DropdownMenu.Item>
            }
          />
          <DeleteTaskDialog
            task={task}
            open={deleteTaskOpen}
            setOpen={setDeleteTaskOpen}
            trigger={
              <DropdownMenu.Item
                className="w-full flex-1 rounded-b-lg  py-3 text-center text-dark-300 transition delay-200 duration-300 ease-in-out hover:cursor-pointer hover:bg-red-500 focus:outline-none"
                onSelect={(event) => {
                  event.preventDefault();
                  setDeleteTaskOpen(true);
                }}
              >
                Delete
              </DropdownMenu.Item>
            }
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </>
  );
};
