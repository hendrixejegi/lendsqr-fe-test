import { Bell, ChevronDown, Search } from 'lucide-react';

import logo from '@/assets/lendsqr-logo.svg';

import { useAuth } from '../AuthProvider';

export const DashboardHeader = () => {
  const { user } = useAuth();
  return (
    <header className="dashboard--header">
      <img
        src={logo}
        width={173.76473999023438}
        height={36}
        alt="Lendsqr logo"
      />

      <div className="dashboard--header--search">
        <input
          className="input"
          name="search"
          id="search"
          placeholder="Search for anything"
        />
        <button className="button button--primary">
          <Search />
        </button>
      </div>

      <div className="dashboard--header--user">
        <a href="#">Docs</a>
        <button className="button button--ghost">
          <Bell />
        </button>
        <div className="user--profile-settings">
          <img src="/adedeji.png" width={48} height={48} alt={user || ''} />
          <button className="button button--ghost">
            <span>{user ? user.split(' ')[0] : 'Man'}</span>
            <ChevronDown />
          </button>
        </div>
      </div>
    </header>
  );
};
