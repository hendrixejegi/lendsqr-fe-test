import { use, useEffect } from 'react';

import { getUsers } from '@/api/getUsers';

import { UsersSummaries } from './UserSummaries';
import { UsersTable } from './UserTable';

export const UserPageContent = () => {
  const data = use(getUsers());

  useEffect(() => {
    localStorage.setItem('lendsqr_user_data', JSON.stringify(data));
  }, [data]);

  return (
    <>
      <UsersSummaries userData={data} />
      <UsersTable userData={data} />
    </>
  );
};
