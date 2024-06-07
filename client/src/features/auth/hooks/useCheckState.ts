import { useContext, useEffect } from 'react';

import { AuthContext } from '@/features/auth/Auth.context';

export const useCheckState = () => {
  const { jwt, user, userRole, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    (!jwt || !user || !userRole) && handleLogout();
  }, [jwt, user, userRole, handleLogout]);
};
