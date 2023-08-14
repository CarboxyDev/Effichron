'use client';

import { LoadingSpinner } from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ResponseData {
  data: string | number;
  message: string;
}

const UserCountCard = (props: { password: string | null }) => {
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
      <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg border border-dark-900 bg-dark-900 px-8 py-6">
        <div className="text-3xl text-dark-200">User count</div>
        <div className="text-4xl text-dark-400">
          {status === 'success' && data.data}
          {status === 'loading' && <LoadingSpinner />}
          {status === 'error' && 'Error'}
        </div>
      </div>
    </>
  );
};

export default UserCountCard;
