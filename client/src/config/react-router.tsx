import { createBrowserRouter } from 'react-router-dom';

import { AboutPage } from '@/pages/About.page';
import { ErrorPage } from '@/pages/Error.page';
import { HomePage } from '@/pages/Home.page';

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
]);
