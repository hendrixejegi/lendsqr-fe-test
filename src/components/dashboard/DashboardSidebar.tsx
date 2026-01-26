import '@/scss/dashboard-sidebar.scss';

import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

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
import Transactions from '@/assets/icons/transactions.svg?react';
import Whitelist from '@/assets/icons/user-check.svg?react';
import ServiceAcct from '@/assets/icons/user-cog.svg?react';
import Guarantors from '@/assets/icons/user-friends.svg?react';
import Karma from '@/assets/icons/user-times.svg?react';
import Users from '@/assets/icons/users.svg?react';

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
];

export const DashboardSidebar = () => {
  return (
    <nav className="dashboard--sidebar">
      <header>
        <div className="organization">
          <button>
            <Briefcase aria-hidden="true" />
            <span>Switch Organization</span>
            <ChevronDown />
          </button>
        </div>
      </header>

      <Link to="#" className="dashboard--link">
        <Home aria-hidden="true" />
        <span>Dashboard</span>
      </Link>

      <LinkGroup title="Customers" list={customersLinkGroup} />
      <LinkGroup title="Businesses" list={businessesLinkGroup} />
      <LinkGroup title="Settings" list={settingsLinkGroup} />
    </nav>
  );
};

const LinkGroup = ({ title, list }: { title: string; list: SidebarLink[] }) => {
  return (
    <div className="sidebar--group">
      <h2 className="sidebar--group-label">{title}</h2>
      <ul className="sidebar--group--links">
        {list.map(([name, Icon, path]) => (
          <li key={name}>
            <Link to={path} className="dashboard--link">
              <Icon aria-hidden="true" />
              <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
