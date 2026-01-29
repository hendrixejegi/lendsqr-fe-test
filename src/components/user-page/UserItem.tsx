import '@/scss/user-item.scss';

import { EllipsisVertical, Eye, UserCheck, UserX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { formatDate } from '@/lib/utils';

const UserStatus = ({ status }: { status: Status }) => {
  return <div className={`status-${status}`}>{status}</div>;
};

export const UserItem = ({ user }: { user: User }) => {
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

  const handleMenuAction = (action: 'view' | 'blacklist' | 'activate') => {
    console.log(`${action} for user:`, user.email);
    setIsMenuOpen(false);

    if (action === 'view') {
      navigate(`/dashboard/users/${user.id}`);
    }
  };

  return (
    <tr className="user-row">
      <td>{user.organization}</td>
      <td>{user.f_name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{formatDate(user.joined)}</td>
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
              onClick={() => handleMenuAction('blacklist')}
            >
              <UserX size={16} /> <span>Blacklist User</span>
            </button>
            <button
              className="menu-item"
              onClick={() => handleMenuAction('activate')}
            >
              <UserCheck size={16} /> <span>Activate User</span>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

// export const UserItem = ({ user }: { user: User }) => {
//   return (
//     <tr>
//       <td>{user.organization}</td>
//       <td>{user.f_name}</td>
//       <td>{user.email}</td>
//       <td>{user.phone}</td>
//       <td>{formatDate(user.joined)}</td>
//       <td>
//         <UserStatus status={user.status} />
//       </td>
//       <td>
//         <EllipsisVertical />
//       </td>
//     </tr>
//   );
// };
