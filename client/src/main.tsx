import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { MainTheme } from './components/themes';
import { reactRouter } from './config/react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainTheme>
      <RouterProvider router={reactRouter} />
    </MainTheme>
  </React.StrictMode>,
);
