'use client';

import { LoadingSpinner } from '@/components/Loading';
import { getErrorMessage } from '@/utils/api';
import {
  cn,
  dateDifference,
  dateToAlphaDayFormat,
  secondsToAlphaTimeFormat,
} from '@/utils/util';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';

/*
  CAUTION: This file contains two component versions of a component for mobile and non-mobile support. CSS only support was not feasible.
  Whenever making changes to the SessionLogCard, do not forget to update its mobile counterpart.
*/

interface SessionSnapshot {
  name: string;
  duration: number;
}

interface SessionLog {
  id: String;
  createdAt: Date;
  sessionSnapshot: SessionSnapshot[];
}

const totalDurationReducer = (total: number, task: any) => {
  return total + task.duration;
};

export const SessionHistoryContainer = () => {
  const fetchSessionLogsCount = useRef(5);
  const queryClient = useQueryClient();

  const { data, status, error } = useQuery({
    queryKey: ['session-history'],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/session?count=` + fetchSessionLogsCount.current
      );
      console.log(`Fetch ${fetchSessionLogsCount.current} session logs`);
      const sessionLogs = data as SessionLog[];
      return sessionLogs;
    },
  });

  if (status === 'loading') {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <span className="text-zinc-400">
        Unable to fetch history: {getErrorMessage(error as Error)}
      </span>
    );
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
        {data?.length === 0 && (
          <div className="mt-12 text-2xl text-zinc-400">
            You do not have any saved sessions
          </div>
        )}
        {todaySessions.length > 0 && (
          <h3 className="mb-3 text-xl font-medium text-zinc-500 md:mb-6">
            Today
          </h3>
        )}
        {todaySessions?.map((session) => {
          return (
            <div key={session.id as string}>
              <div className="hidden md:block">
                <SessionLogCard key={session.id as string} session={session} />
              </div>
              <div className="block md:hidden">
                <SessionLogCardMobile
                  key={session.id as string}
                  session={session}
                />
              </div>
            </div>
          );
        })}

        {thisWeekSessions.length > 0 && (
          <h3 className="mb-3 mt-12 text-xl font-medium text-zinc-500 md:mb-6 md:mt-20">
            This week
          </h3>
        )}
        {thisWeekSessions?.map((session) => {
          return (
            <div key={session.id as string} className="">
              <div className="hidden md:block">
                <SessionLogCard session={session} />
              </div>
              <div className="block md:hidden">
                <SessionLogCardMobile session={session} />
              </div>
            </div>
          );
        })}

        {oldSessions.length > 0 && (
          <h3 className="mb-3 mt-12 text-xl font-medium text-zinc-500 md:mb-6 md:mt-20">
            Older
          </h3>
        )}
        {oldSessions?.map((session) => {
          return (
            <div key={session.id as string} className="">
              <div className="hidden md:block">
                <SessionLogCard session={session} />
              </div>
              <div className="block md:hidden">
                <SessionLogCardMobile session={session} />
              </div>
            </div>
          );
        })}

        {data?.length >= fetchSessionLogsCount.current && (
          <div className="mx-auto mt-24">
            <button
              className="flex select-none items-center justify-center rounded-lg border border-zinc-500 bg-transparent px-4 py-2 text-base text-zinc-500 transition delay-200 duration-200 ease-in-out hover:scale-105 hover:bg-zinc-700 hover:text-zinc-200"
              onClick={() => {
                fetchSessionLogsCount.current += 5;
                queryClient.invalidateQueries(['session-history']);
              }}
            >
              View more
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export const SessionLogCard = (props: { session: SessionLog }) => {
  const { session } = props;

  const [isBigLog, setIsBigLog] = useState(false);
  const [expandLog, setExpandLog] = useState(false);

  const totalDuration: number = session.sessionSnapshot.reduce(
    totalDurationReducer,
    0
  );
  const totalDurationFormatted = secondsToAlphaTimeFormat(totalDuration, true);

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
          'flex w-full select-none flex-row rounded-lg border border-transparent border-zinc-800 bg-zinc-900 shadow-md transition delay-200 duration-300 ease-in-out hover:border-zinc-700',
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
        <div className="grid w-140 grow grid-cols-4 gap-x-15 gap-y-16 px-20 py-14 lg:w-160 xl:w-200">
          {sessionSnapshot.map((task, idx) => {
            if (idx >= 4 && !expandLog) {
              if (!isBigLog) {
                setIsBigLog(true);
              }
              return <></>;
            }
            return (
              // TODO: Maybe hide tasks with duration 0 because they're probably not needed
              // But then again, the user might want to see the tasks which he failed to spend time on

              <div key={task.name} className="w-fit">
                <div className="text-xl text-zinc-400">
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
        <div className="flex w-60 items-center justify-center border-l border-zinc-800">
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

export const SessionLogCardMobile = (props: { session: SessionLog }) => {
  const { session } = props;

  const [isBigLog, setIsBigLog] = useState(false);
  const [expandLog, setExpandLog] = useState(false);

  const totalDuration: number = session.sessionSnapshot.reduce(
    totalDurationReducer,
    0
  );
  const totalDurationFormatted = secondsToAlphaTimeFormat(totalDuration, true);

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
          'flex w-full select-none flex-row rounded-lg border border-transparent border-zinc-800 bg-zinc-900 shadow-md transition delay-200 duration-300 ease-in-out hover:border-zinc-700',
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
        <div className="grid w-11/12 grow grid-cols-2 gap-x-10 gap-y-8 px-8 py-6">
          {sessionSnapshot.map((task, idx) => {
            if (idx >= 2 && !expandLog) {
              if (!isBigLog) {
                setIsBigLog(true);
              }
              return <></>;
            }
            return (
              <div key={task.name} className="w-fit">
                <div className="text-base text-zinc-400">
                  {task.name.slice(0, 8)}
                  {task.name.length >= 9 && task.name.length <= 11 && (
                    <>{task.name.slice(8, 11)}</>
                  )}
                  {task.name.length >= 9 && task.name.length > 11 && (
                    <span className="text-zinc-600">...</span>
                  )}
                </div>
                <div className="mt-2 text-sm text-zinc-600">
                  {secondsToAlphaTimeFormat(task.duration, false)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-40 items-center justify-center border-l border-zinc-800">
          <div className="flex flex-col justify-center">
            <div className="text-xl font-semibold text-zinc-400">
              {totalDurationFormatted}
            </div>
            <div className="mt-2 text-base text-zinc-500">{dateFormatted}</div>
          </div>
        </div>
      </div>
    </>
  );
};
