'use client';

import { LoadingSpinner } from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ResponseData {
  data: string | number;
  message: string;
}

interface AdminCardProps {
  password: string | null;
}

export const UserCountCard = (props: AdminCardProps) => {
  const { password } = props;

  const { data, error, status } = useQuery({
    queryKey: ['admin-user-count'],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/admin?password=${password}&type=usercount`
      );

      return JSON.parse(data) as ResponseData;
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-14 rounded-lg border border-dark-800 bg-dark-900 px-8 py-8">
        <div className="text-3xl text-dark-200">User count</div>
        <div className="text-4xl text-dark-400">
          {status === 'success' && data.data}
          {status === 'loading' && <LoadingSpinner size={32} />}
          {status === 'error' && 'Error'}
        </div>
      </div>
    </>
  );
};

export const TaskCountCard = (props: AdminCardProps) => {
  const { password } = props;

  const { data, error, status } = useQuery({
    queryKey: ['admin-task-count'],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/admin?password=${password}&type=taskcount`
      );

      return JSON.parse(data) as ResponseData;
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-14 rounded-lg border border-dark-800 bg-dark-900 px-8 py-8">
        <div className="text-3xl text-dark-200">Task count</div>
        <div className="text-4xl text-dark-400">
          {status === 'success' && data.data}
          {status === 'loading' && <LoadingSpinner size={32} />}
          {status === 'error' && 'Error'}
        </div>
      </div>
    </>
  );
};

export const SessionLogCountCard = (props: AdminCardProps) => {
  const { password } = props;

  const { data, error, status } = useQuery({
    queryKey: ['admin-sessionlog-count'],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/admin?password=${password}&type=sessionlogcount`
      );

      return JSON.parse(data) as ResponseData;
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-14 rounded-lg border border-dark-800 bg-dark-900 px-8 py-8">
        <div className="text-3xl text-dark-200">SessionLog count</div>
        <div className="text-4xl text-dark-400">
          {status === 'success' && data.data}
          {status === 'loading' && <LoadingSpinner size={32} />}
          {status === 'error' && 'Error'}
        </div>
      </div>
    </>
  );
};
