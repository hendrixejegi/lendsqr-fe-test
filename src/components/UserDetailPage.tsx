import '@/scss/user-detail-page.scss';

import { MoveLeft } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router';

import avatar from '@/assets/avatar.png';

import { EducationAndEmployment } from './user-detail/EducationAndEmployment';
import { Guarantor } from './user-detail/Guarantor';
import { PersonalInformation } from './user-detail/PersonalInformation';
import { Socials } from './user-detail/Socials';
import { TierStars } from './user-detail/TierStars';

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
        <div>
          <div className="user-banner">
            <div className="user-banner--summary">
              <div className="summary--personal">
                <img src={avatar} alt={data.f_name} width={100} height={100} />
                <div>
                  <span>
                    {data.f_name} {data.l_name}
                  </span>
                  <span>{data.id.slice(0, 12)}</span>
                </div>
              </div>
              <div className="summary--separator"></div>
              <div className="summary--tier">
                <span>User's Tier</span>
                <span>
                  <TierStars tier={data.tier} />
                </span>
              </div>
              <div className="summary--separator"></div>
              <div className="summary--account">
                <span>&#8358;{data.account.balance}</span>
                <span>
                  {data.account.number}/{data.account.bank}
                </span>
              </div>
            </div>
            <nav>
              <ul>
                <li className="active">General Details</li>
                <li>Documents</li>
                <li>Bank Details</li>
                <li>Loans</li>
                <li>Savings</li>
                <li>App and System</li>
              </ul>
            </nav>
          </div>
          <div className="user-detail-group">
            <PersonalInformation data={data} />
            <EducationAndEmployment data={data} />
            <Socials data={data} />
            <Guarantor data={data} />
          </div>
        </div>
      )}
    </div>
  );
};
