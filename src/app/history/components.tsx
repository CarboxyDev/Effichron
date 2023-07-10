'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface SessionLog {
  id: String;
  createdAt: Date;
  sessionSnapshot: {
    name: string;
    duration: number;
  };
}

const SessionHistoryContainer = () => {
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

  if (status === 'error') {
    return <>Unable to fetch history</>;
  }

  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};

export default SessionHistoryContainer;
