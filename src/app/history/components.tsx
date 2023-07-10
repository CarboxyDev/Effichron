'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

interface SessionLog {
  name: string;
  duration: number;
}

const SessionHistoryContainer = () => {
  console.log('Render SessionHistoryContainer');
  const [sessionLogs, setSessionLogs] = useState<SessionLog[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  useEffect(() => {
    fetch('/api/session')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch notes');
        return res.json();
      })
      .then((data) => {
        console.log('Success');
        setSessionLogs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Error');
        setIsFailed(true);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <>Loading...</>;
  }
  if (isFailed) {
    return <>Unable to fetch sessions</>;
  }
  return <>{JSON.stringify(sessionLogs)}</>;
};

export default SessionHistoryContainer;
