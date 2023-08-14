import { prisma } from '@/lib/prisma';
import { SendResponse } from '@/utils/api';

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

  return SendResponse('API endpoint not working yet', 200);
}
