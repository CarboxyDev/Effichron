import { getUserFromSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { TaskStrictSchema } from '@/lib/schemas';
import { SendResponse } from '@/utils/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function PUT_TASK(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const getUser = await getUserFromSession(session);

  const user = getUser.user;
  if (!user) {
    return getUser.errorResponse;
  }

  const json = await req.json();
  const body = TaskStrictSchema.safeParse(json);

  if (!body.success) {
    return SendResponse('Unable to edit the task. Try again.', 400);
  }

  const { name, color, id: taskid } = body.data;

  if (name.length > 20) {
    return SendResponse('Task name is too long', 403);
  }
  if (name.length === 0) {
    return SendResponse('Task name cannot be empty', 403);
  }
  if (color.length === 0) {
    return SendResponse('You must provide a color for the task', 403);
  }

  try {
    // FIXME: I'm unable to add userId as a where condition.
    // Therefore, if a different user tries to delete someone's task,
    // they can do so, provided they have the taskid which is extremely unlikely to happen.
    await prisma.task.update({
      where: {
        id: taskid,
      },
      data: {
        name: name,
        color: color,
      },
    });
    console.log('[DB] Edited a task');
    return SendResponse('Edited the task', 200);
  } catch (error) {
    console.log('[DB] Failed to edit task. Task not found -> ', taskid);
    return SendResponse('Task not found and could not be edited', 404);
  }
}
