import { getUserFromSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { TaskSchema } from '@/lib/schemas';
import { SendResponse } from '@/utils/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function POST_TASK(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const getUser = await getUserFromSession(session, {
    notLoggedIn: 'You have to be logged in to create tasks',
    invalidAccount: 'You do not have a valid account',
  });

  const user = getUser.user;
  if (!user) {
    return getUser.errorResponse;
  }

  const json = await req.json();
  const body = TaskSchema.safeParse(json);

  if (!body.success) {
    return SendResponse('You tried to create an invalid task.', 400);
  }

  const { name, color } = body.data;

  const userTaskCount = await prisma.task.count({
    where: {
      userId: user.id,
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
  try {
    const newTask = await prisma.task.create({
      data: {
        userId: user.id,
        name: name,
        color: color,
      },
    });

    console.log('[DB] Created task');

    // Necessary to send the taskid to the user as they will require that to interact with the database.
    return SendResponse(
      JSON.stringify({ message: 'Created the task', taskid: newTask.id }),
      200
    );
  } catch (error) {
    console.log('[DB] Unable to create task');
    return SendResponse('Failed to create task', 500);
  }
}
