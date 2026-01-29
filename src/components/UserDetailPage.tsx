import '@/scss/user-detail-page.scss';

import { MoveLeft } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router';

export const UserDetailPage = () => {
  const { userId } = useParams<{ userId: string }>();

  const data = useMemo(() => {
    const localData = localStorage.getItem('lendsqr_user_data') as string;
    const userData: User[] = JSON.parse(localData);
    const matching = userData.find((user) => user.id === userId);
    return matching;
  }, [userId]);

  return (
    <div className="user-detail-page">
      <header>
        <div className="return-button">
          <Link to="/dashboard/users">
            <MoveLeft /> <span>Back to Users</span>
          </Link>
        </div>
        <div>
          <h1>User Details</h1>

          <div className="action-button">
            <button>blacklist user</button>
            <button>activate user</button>
          </div>
        </div>
      </header>

      {data && (
        
      )}
    </div>
  );
};
