import { type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from './AuthProvider';

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/', { replace: true });
    }
  }, [navigate, user]);

  return children;
};
