import { createBrowserRouter } from 'react-router-dom';

import { AboutPage } from '@/pages/About.page';
import { AdminPage } from '@/pages/Admin.page';
import { ErrorPage } from '@/pages/Error.page';
import { HomePage } from '@/pages/Home.page';
import { LoginPage } from '@/pages/Login.page';
import { RegisterPage } from '@/pages/Register.page';

export const reactRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'about',
    element: <AboutPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'admin',
    element: <AdminPage />,
  },
]);
