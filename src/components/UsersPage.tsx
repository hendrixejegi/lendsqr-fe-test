import '@/scss/users-page.scss';

import { EllipsisVertical, ListFilter } from 'lucide-react';
import { Suspense, use, useEffect } from 'react';

import { getUsers } from '@/api/getUsers';
import Active from '@/assets/user-page/active-users.svg?react';
import Users from '@/assets/user-page/users.svg?react';
import Loan from '@/assets/user-page/users-loans.svg?react';
import Savings from '@/assets/user-page/users-savings.svg?react';
import { formatNum } from '@/lib/utils';

import { ErrorBoundary } from './ErrorBoundary';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UsersSummary = [React.ComponentType<any>, string, number];

const tableHeaders = [
  'Organization',
  'Username',
  'Email',
  'Phone Number',
  'Date Joined',
  'Status',
];

export const UsersPage = () => {
  return (
    <div className="users-page">
      <h1>Users</h1>

      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserPageContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const UserPageContent = () => {
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

const Summary = ({ summary }: { summary: UsersSummary }) => {
  const [Icon, name, value] = summary;

  return (
    <div className="summary">
      <Icon />
      <span className="summary--name">{name}</span>
      <span className="summary--value">{formatNum(value)}</span>
    </div>
  );
};

const UsersSummaries = ({ userData }: { userData: User[] }) => {
  const totalUsers = userData.length;

  const activeUsers = userData.filter(
    (user) => user.status === 'active',
  ).length;

  const usersWithLoan = userData.filter((user) => user.repayment > 0).length;

  const usersWithSavings = userData.filter(
    (user) => user.account.balance > 0,
  ).length;

  return (
    <div className="users-page--summary">
      <Summary summary={[Users, 'Users', totalUsers]} />
      <Summary summary={[Active, 'Active Users', activeUsers]} />
      <Summary summary={[Loan, 'Users With Loans', usersWithLoan]} />
      <Summary summary={[Savings, 'Users With Savings', usersWithSavings]} />
    </div>
  );
};

const UsersTable = ({ userData }: { userData: User[] }) => {
  return (
    <div className="users-page--table">
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>
                <div className="table-head">
                  <span>{header}</span>
                  <ListFilter />
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.f_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.joined}</td>
                <td>{user.status}</td>
                <td>
                  <EllipsisVertical />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
