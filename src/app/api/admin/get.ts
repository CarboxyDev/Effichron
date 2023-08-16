import { prisma } from '@/lib/prisma';
import { SendResponse } from '@/utils/api';

/**
 * No need to sanitize the responses from this endpoint as only the admin has access to the confidential data that may be sent
 */

export async function GET_ADMIN(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get('password');

  if (password !== process.env.ADMIN_PASSWORD) {
    return SendResponse('Forbidden', 403);
  }

  const queryType = searchParams.get('type');

  if (!queryType) {
    return SendResponse('No type of query specified', 400);
  }

  if (queryType === 'usercount') {
    const userCount = await prisma.user.count();
    return SendResponse(
      JSON.stringify({ data: userCount, message: 'Fetched the user count' }),
      200
    );
  }

  if (queryType === 'taskcount') {
    const taskCount = await prisma.task.count();
    return SendResponse(
      JSON.stringify({ data: taskCount, message: 'Fetched the task count' }),
      200
    );
  }

  if (queryType === 'sessionlogcount') {
    const sessionLogCount = await prisma.sessionLog.count();
    return SendResponse(
      JSON.stringify({
        data: sessionLogCount,
        message: 'Fetched the sessionlog count',
      }),
      200
    );
  }

  if (queryType === 'recentuserjoined') {
    const recentUser = await prisma.user.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return SendResponse(
      JSON.stringify({
        data: recentUser,
        message: 'Fetched the most recent user',
      }),
      200
    );
  }

  if (queryType === 'recentuserslist') {
    const recentUsersList = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    });

    return SendResponse(
      JSON.stringify({
        data: recentUsersList,
        message: 'Fetched the most recent users list',
      }),
      200
    );
  }

  if (queryType === 'recenttaskcreated') {
    const recentTask = await prisma.task.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return SendResponse(
      JSON.stringify({
        data: recentTask,
        message: 'Fetched the most recent task',
      }),
      200
    );
  }

  return SendResponse('Invalid query sent to API endpoint', 200);
}
