import { getUserFromSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SendResponse } from '@/utils/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET_TASK(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const getUser = await getUserFromSession(session, {
    notLoggedIn: 'You have to be logged in to view tasks',
    invalidAccount: 'You do not have a valid account to view tasks',
  });

  const user = getUser.user;
  if (!user) {
    return getUser.errorResponse;
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });
    console.log('[+] GET tasks');
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.log('[DB] Failed to fetch tasks');
    return SendResponse('Failed to find your tasks', 500);
  }
}
