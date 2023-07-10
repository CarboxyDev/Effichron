'use client';

import {
  cn,
  dateDifference,
  dateToAlphaDayFormat,
  secondsToAlphaTimeFormat,
} from '@/utils/util';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface SessionSnapshot {
  name: string;
  duration: number;
}

interface SessionLog {
  id: String;
  createdAt: Date;
  sessionSnapshot: SessionSnapshot[];
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

  const todaySessions: SessionLog[] = [];
  const thisWeekSessions: SessionLog[] = [];
  const oldSessions: SessionLog[] = [];

  data?.forEach((session) => {
    const dateDiff = dateDifference(new Date(), new Date(session.createdAt));
    if (dateDifference(new Date(), new Date(session.createdAt)) <= 1) {
      todaySessions.push(session);
    } else if (dateDiff > 1 && dateDiff <= 7) {
      thisWeekSessions.push(session);
    } else {
      oldSessions.push(session);
    }
  });

  return (
    <>
      <div className="grid gap-y-6">
        {todaySessions.length > 0 && (
          <h3 className="mb-6 text-xl font-medium text-zinc-500">Today</h3>
        )}
        {todaySessions?.map((session) => {
          return (
            <SessionLogCard key={session.id as string} session={session} />
          );
        })}

        {thisWeekSessions.length > 0 && (
          <h3 className="mb-6 mt-20 text-xl font-medium text-zinc-500">
            This week
          </h3>
        )}
        {thisWeekSessions?.map((session) => {
          return (
            <SessionLogCard key={session.id as string} session={session} />
          );
        })}

        {oldSessions.length > 0 && (
          <h3 className="mb-6 mt-20 text-xl font-medium text-zinc-500">
            Older
          </h3>
        )}
        {oldSessions?.map((session) => {
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

  const [isBigLog, setIsBigLog] = useState(false);
  const [expandLog, setExpandLog] = useState(false);

  const totalDuration: number = session.sessionSnapshot.reduce(
    totalDurationReducer,
    0
  );
  const totalDurationFormatted = secondsToAlphaTimeFormat(totalDuration, false);

  const date = new Date(session.createdAt);
  const dateFormatted = dateToAlphaDayFormat(date);

  const sessionSnapshot = session.sessionSnapshot;
  // sort the snapshots by their duration (bigger comes first)
  sessionSnapshot.sort((a: SessionSnapshot, b: SessionSnapshot) => {
    return a.duration <= b.duration ? 1 : -1;
  });

  return (
    <>
      <div
        className={cn(
          'flex w-full select-none flex-row rounded-lg border border-transparent bg-zinc-900 shadow-md transition delay-200 duration-300 ease-linear hover:border-zinc-800',
          isBigLog && 'hover:cursor-pointer'
        )}
        {...(isBigLog
          ? {
              onClick: () => {
                setExpandLog(!expandLog);
              },
            }
          : {})}
      >
        <div className="grid w-200 grow grid-cols-4 gap-x-15 gap-y-16 px-20 py-14">
          {sessionSnapshot.map((task, idx) => {
            if (idx >= 4 && !expandLog) {
              if (!isBigLog) {
                setIsBigLog(true);
              }
              return <></>;
            }
            return (
              <div key={task.name} className="w-fit">
                <div className="text-xl font-medium text-zinc-400">
                  {task.name.slice(0, 8)}
                  {task.name.length >= 9 && task.name.length <= 11 && (
                    <>{task.name.slice(8, 11)}</>
                  )}
                  {task.name.length >= 9 && task.name.length > 11 && (
                    <span className="text-zinc-600">...</span>
                  )}
                </div>
                <div className="mt-6 text-lg text-zinc-600">
                  {secondsToAlphaTimeFormat(task.duration, false)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-80 items-center justify-center border-l border-zinc-800">
          <div className="flex flex-col justify-center">
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
