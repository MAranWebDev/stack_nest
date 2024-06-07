import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { AuthContext } from '@/features/auth/Auth.context';
import { useCheckState } from '@/features/auth/hooks';

export const PublicRoute = () => {
  useCheckState();
  const { jwt } = useContext(AuthContext);
  const currentLocation = useLocation();

  return jwt ? (
    <Navigate to={ROUTES.DASHBOARD} state={{ from: currentLocation }} replace />
  ) : (
    <Outlet />
  );
};
