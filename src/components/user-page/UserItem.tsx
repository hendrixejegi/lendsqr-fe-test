import '@/scss/user-item.scss';

import { EllipsisVertical, Eye, UserCheck, UserX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { useScreen } from '@/lib/hooks/useScreen';
import { formatDate, slice } from '@/lib/utils';

import { useData } from '../DataProvider';

const UserStatus = ({ status }: { status: Status }) => {
  return <div className={`status-${status}`}>{status}</div>;
};

export const UserItem = ({ user }: { user: User }) => {
  const { activateUser, blacklistUser } = useData();
  const { isMobile, isTablet } = useScreen();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuAction = (
    action: 'view' | 'blacklist' | 'activate',
    id?: string,
  ) => {
    setIsMenuOpen(false);

    if (action === 'view') {
      return navigate(`/dashboard/users/${user.id}`);
    }

    if (action === 'activate' && id !== undefined) {
      activateUser(id);
      toast.success('User status updated successfully', {
        style: { color: 'green' },
      });
      return;
    }

    if (action === 'blacklist' && id !== undefined) {
      blacklistUser(id);
      toast.success('User status updated successfully', {
        style: { color: 'green' },
      });
      return;
    }
  };

  return (
    <tr className="user-row">
      {!isMobile && <td>{user.organization}</td>}
      <td>{user.f_name}</td>
      {!isMobile && !isTablet && (
        <td title={user.email}>{slice(user.email, 15)}</td>
      )}
      {!isMobile && !isTablet && <td>{user.phone}</td>}
      {!isMobile && !isTablet && <td>{formatDate(user.joined)}</td>}
      <td>
        <UserStatus status={user.status} />
      </td>
      <td className="actions-cell">
        <button
          ref={buttonRef}
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="User actions"
        >
          <EllipsisVertical />
        </button>
        {isMenuOpen && (
          <div ref={menuRef} className="popover">
            <button
              className="menu-item"
              onClick={() => handleMenuAction('view')}
            >
              <Eye size={16} /> <span>View Details</span>
            </button>
            <button
              className="menu-item"
              onClick={() => handleMenuAction('blacklist', user.id)}
            >
              <UserX size={16} /> <span>Blacklist User</span>
            </button>
            <button
              className="menu-item"
              onClick={() => handleMenuAction('activate', user.id)}
            >
              <UserCheck size={16} /> <span>Activate User</span>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
