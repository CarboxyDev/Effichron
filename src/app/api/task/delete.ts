import { getUserFromSession } from '@/lib/auth';
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

  console.log('[DB] Deleted task');
  return SendResponse('Deleted the task', 200);
}
