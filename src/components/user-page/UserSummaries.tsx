import Active from '@/assets/user-page/active-users.svg?react';
import Users from '@/assets/user-page/users.svg?react';
import Loan from '@/assets/user-page/users-loans.svg?react';
import Savings from '@/assets/user-page/users-savings.svg?react';
import { formatNum } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UsersSummary = [React.ComponentType<any>, string, number];

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

export const UsersSummaries = ({ userData }: { userData: User[] }) => {
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
