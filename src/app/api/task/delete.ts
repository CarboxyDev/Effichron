import { getUserFromSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SendResponse } from '@/utils/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function DELETE_TASK(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const getUser = await getUserFromSession(session, {
    notLoggedIn: 'You have to be logged in to delete tasks',
    invalidAccount: 'You do not have a valid account',
  });

  const user = getUser.user;

  if (!user) {
    return getUser.errorResponse;
  }

  const { searchParams } = new URL(req.url);
  const taskid = searchParams.get('id') as string;

  try {
    await prisma.task.delete({
      where: {
        id: taskid,
      },
    });
    console.log('[DB] Deleted task');
    return SendResponse('Deleted the task', 200);
  } catch (e) {
    console.log('[DB] Failed to delete task. Task not found.');
    return SendResponse('Task not found', 404);
  }
}
