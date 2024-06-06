import { createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from '@/features/auth/components';
import { ROLES } from '@/features/auth/constants';
import { AdminPage } from '@/pages/Admin.page';
import { ErrorPage } from '@/pages/Error.page';
import { HomePage } from '@/pages/Home.page';
import { LoginPage } from '@/pages/Login.page';
import { RegisterPage } from '@/pages/Register.page';
import { UnauthorizedPage } from '@/pages/Unauthorized.page';

const fullAuth = [ROLES.ADMIN];
const writeAuth = [...fullAuth, ROLES.EDITOR];
const readAuth = [...fullAuth, ...writeAuth, ROLES.USER];

export const reactRouter = createBrowserRouter([
  { path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
  { path: 'register', element: <RegisterPage /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'unauthorized', element: <UnauthorizedPage /> },
  {
    element: <PrivateRoute roles={fullAuth} />,
    children: [{ path: 'admin', element: <AdminPage /> }],
  },
  {
    element: <PrivateRoute roles={writeAuth} />,
    children: [],
  },
  {
    element: <PrivateRoute roles={readAuth} />,
    children: [],
  },
]);
