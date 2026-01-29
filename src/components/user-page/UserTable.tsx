import * as _ from 'lodash';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ListFilter,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { useScreen } from '@/lib/hooks/useScreen';

import { useData } from '../DataProvider';
import { type FilterInputs, TableFilter } from './TableFilter';
import { UserItem } from './UserItem';

export const UsersTable = () => {
  const { data: userData } = useData();
  const { isTablet, isMobile } = useScreen();
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
              {!isMobile && (
                <th>
                  <div className="table-head">
                    <span>Organization</span>
                    <button popoverTarget="table-filter">
                      <ListFilter size={18} />
                    </button>
                  </div>
                </th>
              )}
              <th>
                <div className="table-head">
                  <span>Username</span>
                  <button popoverTarget="table-filter">
                    <ListFilter size={18} />
                  </button>
                </div>
              </th>
              {!isMobile && !isTablet && (
                <th>
                  <div className="table-head">
                    <span>Email</span>
                    <button popoverTarget="table-filter">
                      <ListFilter size={18} />
                    </button>
                  </div>
                </th>
              )}
              {!isMobile && !isTablet && (
                <th>
                  <div className="table-head">
                    <span>Phone Number</span>
                    <button popoverTarget="table-filter">
                      <ListFilter size={18} />
                    </button>
                  </div>
                </th>
              )}
              {!isMobile && !isTablet && (
                <th>
                  <div className="table-head">
                    <span>Date Joined</span>
                    <button popoverTarget="table-filter">
                      <ListFilter size={18} />
                    </button>
                  </div>
                </th>
              )}
              <th>
                <div className="table-head">
                  <span>Status</span>
                  <button popoverTarget="table-filter">
                    <ListFilter size={18} />
                  </button>
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => {
              return <UserItem key={user.id} user={user} />;
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
