import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AuthContext } from '@/features/auth/Auth.context';

const ROUTES = {
  UNAUTHORIZED: '/unauthorized',
} as const;

interface PropsType {
  roles: (string | null)[];
}

export const PrivateRoute = ({ roles }: PropsType) => {
  const { userRole } = useContext(AuthContext);
  const currentLocation = useLocation();

  return !roles.includes(userRole) ? (
    <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: currentLocation }} replace />
  ) : (
    <Outlet />
  );
};
