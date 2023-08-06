import { prisma } from '@/lib/prisma';
import { TaskSchema } from '@/lib/schemas';
import { SendResponse } from '@/utils/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function POST_TASK(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return SendResponse('You have to be logged in to create tasks', 401);
  }

  const user = session.user;
  const json = await req.json();
  const body = TaskSchema.safeParse(json);

  if (user === null || user === undefined) {
    return SendResponse('You have to be logged in to create tasks', 401);
  }

  if (!body.success) {
    return SendResponse('You tried to create an invalid task.', 400);
  }

  const { name, color } = body.data;

  const prismaUser = await prisma.user.findUnique({
    where: {
      email: user.email as string,
    },
  });

  if (!prismaUser) {
    return SendResponse(
      'You do not have a valid account for creating tasks',
      403
    );
  }

  const userId = prismaUser?.id;

  const userTaskCount = await prisma.task.count({
    where: {
      userId: userId,
    },
  });

  if (userTaskCount > 10) {
    return SendResponse('You can only have 10 tasks at most', 403);
  }

  if (name.length > 20) {
    return SendResponse('Task name is too long', 403);
  }

  if (color.length === 0) {
    return SendResponse('You must provide a color for the task', 403);
  }

  await prisma.task.create({
    data: {
      userId: userId,
      name: name,
      color: color,
    },
  });

  console.log('[DB] Created task');
  return SendResponse('Created the task', 200);
}
