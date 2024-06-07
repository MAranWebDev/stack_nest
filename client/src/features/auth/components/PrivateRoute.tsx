import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { AuthContext } from '@/features/auth/Auth.context';
import { ROLES } from '@/features/auth/constants';

interface PropsType {
  roles: ROLES[];
}

export const PrivateRoute = ({ roles }: PropsType) => {
  const { userRole } = useContext(AuthContext);
  const currentLocation = useLocation();

  if (!userRole) return <Navigate to={ROUTES.LOGIN} state={{ from: currentLocation }} replace />;

  if (!roles.includes(userRole as ROLES))
    return <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: currentLocation }} replace />;

  return <Outlet />;
};
