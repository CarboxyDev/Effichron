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

  // This goes through all the database records which makes it very inefficient.
  // Try having the latest session's timestamp recorded somewhere instead.
  const latestSessionLog = await prisma.sessionLog.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  });

  if (latestSessionLog) {
    const latestLog = latestSessionLog[0];
    const now = new Date();
    const diff = now.getTime() - latestLog.createdAt.getTime();
    const diffInMins = Math.floor(diff / 1000 / 60);

    if (diffInMins < 5) {
      console.log('[!] User tried to save session too soon');
      return new Response(
        JSON.stringify('You must wait 5 minutes before saving another session'),
        { status: 429 }
      );
    }
  }

  await prisma.sessionLog.create({
    data: {
      userId: userId,
      sessionSnapshot: JSON.stringify(cleanSnapshot), // This is mandatory, the DB will only store strings
    },
  });

  console.log('[DB] Saved session snapshot');
  return new Response('OK', { status: 200 });
}

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const user = session.user;

  if (user === null || user === undefined) {
    return new Response('Unauthorized', { status: 401 });
  }

  const prismaUser = await prisma.user.findUnique({
    where: {
      email: user.email as string,
    },
  });

  if (!prismaUser) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = prismaUser?.id;

  const sessionLogs = await prisma.sessionLog.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 15, // hard limit of 15 for now
  });

  const sessionLogsJSON = sessionLogs.map((log) => {
    return {
      id: log.id,
      sessionSnapshot: JSON.parse(log.sessionSnapshot),
      createdAt: log.createdAt,
    };
  });

  console.log('[+] Send session logs');
  return new Response(JSON.stringify(sessionLogsJSON), { status: 200 });
}
