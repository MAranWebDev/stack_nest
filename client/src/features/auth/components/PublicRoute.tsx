import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { AuthContext } from '@/features/auth/Auth.context';

export const PublicRoute = () => {
  const { userRole } = useContext(AuthContext);
  const currentLocation = useLocation();

  return userRole ? (
    <Navigate to={ROUTES.DASHBOARD} state={{ from: currentLocation }} replace />
  ) : (
    <Outlet />
  );
};
