import '@/scss/dashboard-sidebar.scss';

import classNames from 'classnames';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import Fee from '@/assets/icons/badge-percent.svg?react';
import Bank from '@/assets/icons/bank.svg?react';
import Briefcase from '@/assets/icons/briefcase.svg?react';
import Reports from '@/assets/icons/chart-bar.svg?react';
import Audit from '@/assets/icons/clipboard-list.svg?react';
import Coins from '@/assets/icons/coins-solid.svg?react';
import Services from '@/assets/icons/galaxy.svg?react';
import LoanRequest from '@/assets/icons/hand-holding.svg?react';
import DecisionModels from '@/assets/icons/handshake-regular.svg?react';
import Home from '@/assets/icons/home.svg?react';
import Savings from '@/assets/icons/piggy-bank.svg?react';
import Loans from '@/assets/icons/sack.svg?react';
import Settlement from '@/assets/icons/scroll.svg?react';
import Preferences from '@/assets/icons/sliders.svg?react';
import Tire from '@/assets/icons/tire.svg?react';
import Transactions from '@/assets/icons/transactions.svg?react';
import Whitelist from '@/assets/icons/user-check.svg?react';
import ServiceAcct from '@/assets/icons/user-cog.svg?react';
import Guarantors from '@/assets/icons/user-friends.svg?react';
import Karma from '@/assets/icons/user-times.svg?react';
import Users from '@/assets/icons/users.svg?react';
import SignOut from '@/assets/sign-out.svg?react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SidebarLink = [string, React.ComponentType<any>, string];

// All list follow this arrangement [name, icon, path]

const customersLinkGroup: SidebarLink[] = [
  ['Users', Users, '/dashboard/users'],
  ['Guarantors', Guarantors, '/dashboard'],
  ['Loans', Loans, '/dashboard'],
  ['Decision Models', DecisionModels, '/dashboard'],
  ['Savings', Savings, '/dashboard'],
  ['Loan Request', LoanRequest, '/dashboard'],
  ['Whitelist', Whitelist, '/dashboard'],
  ['Karma', Karma, '/dashboard'],
];

const businessesLinkGroup: SidebarLink[] = [
  ['Organization', Briefcase, '/dashboard'],
  ['Loan Products', LoanRequest, '/dashboard'],
  ['Savings Products', Bank, '/dashboard'],
  ['Fees and Charges', Coins, '/dashboard'],
  ['Transactions', Transactions, '/dashboard'],
  ['Services', Services, '/dashboard'],
  ['Service Account', ServiceAcct, '/dashboard'],
  ['Settlement', Settlement, '/dashboard'],
  ['Reports', Reports, '/dashboard'],
];

const settingsLinkGroup: SidebarLink[] = [
  ['Preferences', Preferences, '/dashboard'],
  ['Fees and Pricing', Fee, '/dashboard'],
  ['Audit Logs', Audit, '/dashboard'],
  ['System Messages', Tire, '/dashboard'],
];

export const DashboardSidebar = () => {
  const [sidebarView, setSidebarView] = useState<'full' | 'icon'>('full');
  const spanClass = classNames({ 'show-icon': sidebarView === 'icon' });
  const navigate = useNavigate();

  const handleViewChange = () => {
    if (sidebarView === 'full') {
      setSidebarView('icon');
      return;
    }
    setSidebarView('full');
  };

  const handleSignout = () => {
    localStorage.removeItem('lendsqr-session');
    localStorage.removeItem('lendsqr_user_data');
    navigate('/');
  };

  return (
    <nav className="dashboard--sidebar">
      <header>
        <div className="organization">
          <button>
            <Briefcase aria-hidden="true" />
            <span className={spanClass}>Switch Organization</span>
            <ChevronDown className={spanClass} />
          </button>
        </div>

        <button className="toggle-button" onClick={handleViewChange}>
          <ChevronRight />
        </button>
      </header>

      <Link to="#" className="dashboard--link">
        <Home aria-hidden="true" />
        <span className={spanClass}>Dashboard</span>
      </Link>

      <LinkGroup
        title="Customers"
        list={customersLinkGroup}
        spanClass={spanClass}
      />
      <LinkGroup
        title="Businesses"
        list={businessesLinkGroup}
        spanClass={spanClass}
      />
      <LinkGroup
        title="Settings"
        list={settingsLinkGroup}
        spanClass={spanClass}
      />

      <div className="sidebar-footer">
        <button className="dashboard--link" onClick={handleSignout}>
          <SignOut /> <span className={spanClass}>Logout</span>
        </button>
      </div>
    </nav>
  );
};

const LinkGroup = ({
  title,
  list,
  spanClass,
}: {
  title: string;
  list: SidebarLink[];
  spanClass: string;
}) => {
  return (
    <div className="sidebar--group">
      <h2 className={`sidebar--group-label ${spanClass}`}>{title}</h2>
      <ul className="sidebar--group--links">
        {list.map(([name, Icon, path]) => (
          <li key={name}>
            <Link
              to={path}
              className={`dashboard--link ${path === '/dashboard/users' ? 'dashboard--link-active' : null}`}
            >
              <Icon aria-hidden="true" />
              <span className={spanClass}>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
