import * as _ from 'lodash';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  ListFilter,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { formatDate } from '@/lib/utils';

import { type FilterInputs, TableFilter } from './TableFilter';

const tableHeaders = [
  'Organization',
  'Username',
  'Email',
  'Phone Number',
  'Date Joined',
  'Status',
];

const UserStatus = ({ status }: { status: Status }) => {
  return <div className={`status-${status}`}>{status}</div>;
};

export const UsersTable = ({ userData }: { userData: User[] }) => {
  // Pagination configuration
  const itemsPerPage = 20;
  const [itemsOffset, setItemOffset] = useState(0);
  const endOffset = itemsOffset + itemsPerPage;

  const uniqueOrganization = _.uniqBy(userData, 'organization').map(
    (user) => user.organization,
  );

  const [filter, setFilter] = useState<FilterInputs>({
    date: '',
    email: '',
    organization: '',
    status: '',
    tel: '',
    username: '',
  });

  const filteredData = useMemo(() => {
    return userData.filter((user) => {
      return (
        (filter.organization === '' ||
          user.organization === filter.organization) &&
        (filter.status === '' || user.status === filter.status) &&
        (filter.email === '' ||
          user.email?.toLowerCase().includes(filter.email.toLowerCase())) &&
        (filter.username === '' ||
          user.f_name?.toLowerCase().includes(filter.username.toLowerCase())) &&
        (filter.tel === '' || user.phone?.includes(filter.tel)) &&
        (filter.date === '' || user.joined === filter.date)
      );
    });
  }, [filter, userData]);

  const currentItems = filteredData.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="users-page--table-container">
      <div className="users-page--table">
        <table>
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>
                  <div className="table-head">
                    <span>{header}</span>
                    <button popoverTarget="table-filter">
                      <ListFilter />
                    </button>
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.organization}</td>
                  <td>{user.f_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{formatDate(user.joined)}</td>
                  <td>
                    <UserStatus status={user.status} />
                  </td>
                  <td>
                    <EllipsisVertical />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <div className="current-count">
          Showing{' '}
          <span>
            {currentItems.length} <ChevronDown />
          </span>{' '}
          out of {userData.length}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<ChevronRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel={<ChevronLeft />}
          renderOnZeroPageCount={null}
          containerClassName="pagination--list"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="pagination--button"
          nextClassName="pagination--button"
          activeClassName="active"
        />
      </div>
      <TableFilter
        organizations={uniqueOrganization}
        updateFilters={(data: FilterInputs) => {
          setFilter(data);
          setItemOffset(0);
        }}
      />
    </div>
  );
};
