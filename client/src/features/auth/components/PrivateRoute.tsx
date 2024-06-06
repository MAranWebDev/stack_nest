import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AuthContext } from '@/features/auth/Auth.context';
import { RolesType } from '@/features/auth/constants';

interface PropsType {
  role: RolesType;
}

export const PrivateRoute = ({ role }: PropsType) => {
  const { userRole } = useContext(AuthContext);
  const currentLocation = useLocation();

  return userRole !== role ? (
    <Navigate to="/unauthorized" state={{ from: currentLocation }} replace />
  ) : (
    <Outlet />
  );
};
