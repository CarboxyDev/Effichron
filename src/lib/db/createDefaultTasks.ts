/* This method is used to provide new users with two default tasks.
 * For non-new users, this method refuses to create new default tasks.
 * Referenced in @/app/api/task/get.ts
 */

import { SendResponse } from '@/utils/api';
import { prisma } from '../prisma';

export const createDefaultTasks = async (userId: string): Promise<Response> => {
  try {
    const userTasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });

    if (userTasks.length > 0) {
      return SendResponse(JSON.stringify(userTasks), 200);
    }

    const createTasks = await prisma.task.createMany({
      data: [
        {
          userId: userId,
          name: 'Work',
          color: '#0ea5e9',
        },
        {
          userId: userId,
          name: 'Learn',
          color: '#2dd4bf',
        },
      ],
    });

    const userDefaultTasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });

    console.log('[DB] New user requested default tasks');
    return SendResponse(JSON.stringify(userDefaultTasks), 200);
  } catch (error) {
    return SendResponse('The server is unable to process your request', 500);
  }
};
