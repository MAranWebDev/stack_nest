import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { MainTheme } from './components/themes';
import { ContextProvider } from './config/react-context';
import { QueryProvider } from './config/react-query';
import { reactRouter } from './config/react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* react query */}
    <QueryProvider>
      {/* react context */}
      <ContextProvider>
        {/* mui theme */}
        <MainTheme>
          {/* react router dom */}
          <RouterProvider router={reactRouter} />
        </MainTheme>
      </ContextProvider>
    </QueryProvider>
  </React.StrictMode>,
);
