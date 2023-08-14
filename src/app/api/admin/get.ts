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

  return SendResponse('API endpoint not working yet', 200);
}
