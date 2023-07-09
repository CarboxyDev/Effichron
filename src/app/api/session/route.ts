import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { z } from 'zod';
import { Task } from '@/lib/types';
import { prisma } from '@/lib/prisma';

const SessionSnapshotSchema = z.object({
  session: z.any(),
});

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const user = session.user;
  const json = await req.json();
  const body = SessionSnapshotSchema.safeParse(json);

  if (!body.success) {
    return new Response('Bad Request', { status: 400 });
  }

  if (user === null || user === undefined) {
    return new Response('Unauthorized', { status: 401 });
  }

  const sessionSnapshot = body.data.session;
  const cleanSnapshot = sessionSnapshot.map((task: Task) => {
    return { name: task.name, duration: task.duration };
  });

  // TODO: Handle case where user doesn't have an associated email

  const prismaUser = await prisma.user.findUnique({
    where: {
      email: user.email as string,
    },
  });

  if (!prismaUser) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = prismaUser?.id;

  await prisma.sessionLog.create({
    data: {
      userId: userId,
      sessionSnapshot: JSON.stringify(cleanSnapshot), // This is mandatory, the DB will only store strings
    },
  });

  console.log('[DB] Saved session snapshot');
  return new Response('OK', { status: 200 });
}
