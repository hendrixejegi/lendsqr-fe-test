import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  ListFilter,
} from 'lucide-react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { formatDate } from '@/lib/utils';

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
  const itemsPerPage = 20;
  const [itemsOffset, setItemOffset] = useState(0);
  const endOffset = itemsOffset + itemsPerPage;
  const currentItems = userData.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(userData.length / itemsPerPage);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % userData.length;
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
                    <ListFilter />
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
    </div>
  );
};
