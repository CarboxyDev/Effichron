import { getUserFromSession } from '@/lib/auth';
import { createDefaultTasks } from '@/lib/db/createDefaultTasks';
import { prisma } from '@/lib/prisma';
import { SendResponse } from '@/utils/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET_TASK(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const getUser = await getUserFromSession(session, {});

  const user = getUser.user;
  if (!user) {
    return getUser.errorResponse;
  }

  const { searchParams } = new URL(req.url);
  const fetchDefault = searchParams.get('default');

  // * This will run successfully only for new users
  if (fetchDefault == 'true') {
    return await createDefaultTasks(user.id);
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });
    return SendResponse(JSON.stringify(tasks), 200);
  } catch (error) {
    return SendResponse('Unable to fetch your tasks', 500);
  }
}
