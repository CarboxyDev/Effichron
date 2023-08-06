import { getUserFromSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET_SESSION(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const getUser = await getUserFromSession(session, {
    notLoggedIn: 'You have to be logged in to view your sessions',
    invalidAccount: 'You do not have a valid account',
  });

  const user = getUser.user;
  if (!user) {
    return getUser.errorResponse;
  }

  const { searchParams } = new URL(req.url);
  const fetchCount = parseInt(searchParams.get('count') || '');

  // TODO This might be a bit inefficient as this sends all the previously sent sessions as well which the client already has. Use a cursor to send only the missing sessions
  const sessionLogs = await prisma.sessionLog.findMany({
    where: {
      userId: user.id,
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
