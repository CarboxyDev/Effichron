import { SendResponse } from '@/utils/api';
import { Session } from 'next-auth';
import { prisma } from './prisma';

interface GetUserErrorMessages {
  notLoggedIn?: string; // No user session found
  invalidAccount?: string; // No user record found in database
}

interface GetUserFromSessionReturn {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  errorResponse: Response; // This should only be used when there's an error in user login flow
}

// ! This method uses the user's email to find the user in the database. It is possible (although rare) that the user may not have a linked email, handle that case if possible.
export const getUserFromSession = async (
  session: Session | null,
  errorMessages?: GetUserErrorMessages
): Promise<GetUserFromSessionReturn> => {
  if (!session || !session.user) {
    return {
      user: null,
      errorResponse: SendResponse(
        errorMessages?.notLoggedIn || 'You have to be logged in to do this',
        401
      ),
    };
  }

  const user = session.user;

  const prismaUser = await prisma.eFFICHRON_User.findUnique({
    where: {
      email: user.email as string,
    },
  });

  if (!prismaUser) {
    return {
      user: null,
      errorResponse: SendResponse(
        errorMessages?.invalidAccount || 'You do not have a valid account',
        403
      ),
    };
  }

  const userId = prismaUser.id;
  return {
    user: {
      id: userId,
      name: user.name,
      email: user.email,
      image: user.image,
    },
    errorResponse: SendResponse('OK', 200),
  };
};
