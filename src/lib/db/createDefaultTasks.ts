/*
 * This method is used to provide new users with two default tasks. Also works for users which have deleted all their tasks
 * For users with at least one task in database, this method refuses to create new default tasks and instead sends them their existing tasks
 */

import { SendResponse } from '@/utils/api';
import { prisma } from '../prisma';

export const createDefaultTasks = async (userId: string): Promise<Response> => {
  try {
    const userTasks = await prisma.eFFICHRON_Task.findMany({
      where: {
        userId: userId,
      },
    });

    if (userTasks.length > 0) {
      return SendResponse(JSON.stringify(userTasks), 200);
    }

    const createTasks = await prisma.eFFICHRON_Task.createMany({
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

    const userDefaultTasks = await prisma.eFFICHRON_Task.findMany({
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
