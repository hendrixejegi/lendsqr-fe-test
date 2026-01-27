import '@/scss/users-page.scss';

import { EllipsisVertical, ListFilter } from 'lucide-react';

import Active from '@/assets/user-page/active-users.svg?react';
import Users from '@/assets/user-page/users.svg?react';
import Loan from '@/assets/user-page/users-loans.svg?react';
import Savings from '@/assets/user-page/users-savings.svg?react';
import { formatNum } from '@/lib/utils';

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

      <div className="users-page--summary">
        <Summary summary={[Users, 'Users', 2453]} />
        <Summary summary={[Active, 'Active Users', 2453]} />
        <Summary summary={[Loan, 'Users With Loans', 12453]} />
        <Summary summary={[Savings, 'Users With Savings', 102453]} />
      </div>

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
            <tr>
              <td>Lendsqr</td>
              <td>Adedeji</td>
              <td>adedeji@lendsqr@gmail.com</td>
              <td>0984567890</td>
              <td>May 15, 2020 10:00 AM</td>
              <td>inactive</td>
              <td>
                <EllipsisVertical />
              </td>
            </tr>
            <tr>
              <td>Lendsqr</td>
              <td>Adedeji</td>
              <td>adedeji@lendsqr@gmail.com</td>
              <td>0984567890</td>
              <td>May 15, 2020 10:00 AM</td>
              <td>inactive</td>
              <td>
                <EllipsisVertical />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
