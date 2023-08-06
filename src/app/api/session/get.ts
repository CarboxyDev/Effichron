import { prisma } from '@/lib/prisma';
import { SendResponse } from '@/utils/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET_SESSION(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return SendResponse(
      'You have to be logged in to view your session history',
      401
    );
  }

  const user = session.user;

  if (user === null || user === undefined) {
    return SendResponse(
      'You have to be logged in to view your session history',
      401
    );
  }

  const prismaUser = await prisma.user.findUnique({
    where: {
      email: user.email as string,
    },
  });

  if (!prismaUser) {
    return SendResponse(
      'You have to be logged in to view your session history',
      401
    );
  }

  const userId = prismaUser?.id;
  const { searchParams } = new URL(req.url);
  const fetchCount = parseInt(searchParams.get('count') || '');

  // TODO This might be a bit inefficient as this sends all the previously sent sessions as well which the client already has. Use a cursor to send only the missing sessions
  const sessionLogs = await prisma.sessionLog.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: fetchCount ? fetchCount : 7,
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
