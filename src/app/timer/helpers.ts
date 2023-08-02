import { fixTaskStructure, getActiveTask } from '@/lib/store/useTasks';
import { Task } from '@/lib/types';
import { notify } from '@/utils/notify';
import { sleep } from '@/utils/util';
import { ZodError } from 'zod';

export const validateTaskStructure = async () => {
  console.log(
    '[!] Validating structure of client tasks stored in localstorage. The structure of these tasks may differ from the latest updated structure'
  );
  const activeTask = getActiveTask();

  try {
    Task.parse(activeTask);
    console.log(
      '[!] Structure of local tasks is up-to-date with latest structure.'
    );
  } catch (error) {
    if (error instanceof ZodError) {
      /*
        This is not ideal and will probably be used very rarely as the task structure would not change often.
        It is more meant to be used as a legacy fix for users who used the app during development.
        Anyways, this is potentially destructive as it resets all the user's tasks without their permission.
      */

      console.log(
        '[!] Found mismatch in local task structure and latest task structure.'
      );
      notify('Your tasks are not up to date', 'failure');
      await sleep(3000);
      fixTaskStructure();
      notify('Resetting to default tasks.', 'warning');
    }
  }
};
