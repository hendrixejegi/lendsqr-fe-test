import '@/scss/users-page.scss';
import '@/scss/pagination.scss';

import { UsersSummaries } from './user-page/UserSummaries';
import { UsersTable } from './user-page/UserTable';

export const UsersPage = () => {
  return (
    <div className="users-page">
      <h1>Users</h1>
      <UsersSummaries />
      <UsersTable />
    </div>
  );
};
