import '@/scss/dashboard.scss';

import { Outlet } from 'react-router';

import { DashboardHeader } from './dashboard/DashboardHeader';
import { DashboardSidebar } from './dashboard/DashboardSidebar';
import DataProvider from './DataProvider';

export const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <DashboardHeader />
      <DashboardSidebar />
      <main className="dashboard--view">
        <DataProvider>
          <Outlet />
        </DataProvider>
      </main>
    </div>
  );
};
