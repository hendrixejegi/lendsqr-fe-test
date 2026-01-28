import '@/scss/users-page.scss';
import '@/scss/pagination.scss';

import { Suspense } from 'react';

import { ErrorBoundary } from './ErrorBoundary';
import { UserPageContent } from './user-page/UserPageContent';

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
