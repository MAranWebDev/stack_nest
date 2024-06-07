import { useContext } from 'react';

import { MainLayout } from '@/components/layouts';
import { AuthContext } from '@/features/auth/Auth.context';

export const DashboardPage = () => {
  const { user, userRole } = useContext(AuthContext);

  return (
    <MainLayout>
      <h1>Welcome {user}!</h1>
      <p>Your role is: {userRole}</p>
    </MainLayout>
  );
};
