import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { z } from 'zod';

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

  const sessionSnapshot = body.data.session;
  console.log(user);
  console.log(sessionSnapshot);
  return new Response('OK', { status: 200 });
}
