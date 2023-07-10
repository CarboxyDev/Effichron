'use client';

import { dateToAlphaDayFormat, secondsToAlphaTimeFormat } from '@/utils/util';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface SessionLog {
  id: String;
  createdAt: Date;
  sessionSnapshot: {
    name: string;
    duration: number;
  }[];
}

export const SessionHistoryContainer = () => {
  console.log('Render SessionHistoryContainer');

  const { data, status, error } = useQuery({
    queryKey: ['session-history'],
    queryFn: async () => {
      const { data } = await axios.get('/api/session');
      return data as SessionLog[];
    },
  });

  if (status === 'loading') {
    return <>Loading...</>;
  }

  if (status === 'error' && error instanceof Error) {
    return <>Unable to fetch history: {error.message}</>;
  }

  return (
    <>
      <div className="grid w-full gap-y-8">
        {data?.map((session) => {
          return (
            <SessionLogCard key={session.id as string} session={session} />
          );
        })}
      </div>
    </>
  );
};

const totalDurationReducer = (total: number, task: any) => {
  return total + task.duration;
};

export const SessionLogCard = (props: { session: SessionLog }) => {
  const { session } = props;

  const totalDuration: number = session.sessionSnapshot.reduce(
    totalDurationReducer,
    0
  );
  const totalDurationFormatted = secondsToAlphaTimeFormat(totalDuration, false);

  const date = new Date(session.createdAt);
  const dateFormatted = dateToAlphaDayFormat(date);

  return (
    <>
      <div className="flex w-full flex-row rounded-lg bg-zinc-900 shadow-md">
        <div className="grid grow grid-cols-4 gap-x-20 px-20 py-14">
          {session.sessionSnapshot.map((task) => {
            return (
              <div key={task.name} className="w-fit">
                <div className="text-xl font-medium text-zinc-400">
                  {task.name}
                </div>
                <div className="mt-6 text-lg text-zinc-600">
                  {secondsToAlphaTimeFormat(task.duration, false)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center border-l border-zinc-800 px-20 py-14">
          <div className="flex flex-col items-start">
            <div className="text-3xl font-semibold text-zinc-400">
              {totalDurationFormatted}
            </div>
            <div className="mt-4 text-xl font-medium text-zinc-500">
              {dateFormatted}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
