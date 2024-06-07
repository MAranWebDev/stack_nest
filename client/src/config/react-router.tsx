import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { PrivateRoute, PublicRoute } from '@/features/auth/components';
import { ROLES } from '@/features/auth/constants';
import { AdminPage } from '@/pages/Admin.page';
import { DashboardPage } from '@/pages/Dashboard.page';
import { ErrorPage } from '@/pages/Error.page';
import { HomePage } from '@/pages/Home.page';
import { LoginPage } from '@/pages/Login.page';
import { RegisterPage } from '@/pages/Register.page';
import { UnauthorizedPage } from '@/pages/Unauthorized.page';

const adminAuth = [ROLES.ADMIN];
const defaultAuth = [...adminAuth, ROLES.DEFAULT];

export const reactRouter = createBrowserRouter([
  { path: ROUTES.HOME, element: <HomePage />, errorElement: <ErrorPage /> },

  { path: ROUTES.UNAUTHORIZED, element: <UnauthorizedPage /> },
  {
    element: <PublicRoute />,
    children: [
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
    ],
  },
  {
    element: <PrivateRoute roles={adminAuth} />,
    children: [{ path: ROUTES.ADMIN, element: <AdminPage /> }],
  },
  {
    element: <PrivateRoute roles={defaultAuth} />,
    children: [{ path: ROUTES.DASHBOARD, element: <DashboardPage /> }],
  },
]);
