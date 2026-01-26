import { Bell, ChevronDown, Search } from 'lucide-react';

import logo from '@/assets/lendsqr-logo.svg';

import { useAuth } from '../AuthProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

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
        <Input name="search" id="search" placeholder="Search for anything" />
        <Button variant="primary">
          <Search />
        </Button>
      </div>

      <div className="dashboard--header--user">
        <a href="#">Docs</a>
        <Button variant="ghost">
          <Bell />
        </Button>
        <div className="user--profile-settings">
          <img src="/adedeji.png" width={48} height={48} alt={user || ''} />
          <Button variant="ghost">
            <span>{user ? user.split(' ')[0] : 'Man'}</span>
            <ChevronDown />
          </Button>
        </div>
      </div>
    </header>
  );
};
