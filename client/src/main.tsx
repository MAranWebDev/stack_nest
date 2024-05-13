import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { MainTheme } from './components/themes';
import { reactRouter } from './config/react-router';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainTheme>
        <RouterProvider router={reactRouter} />
      </MainTheme>
    </QueryClientProvider>
  </React.StrictMode>,
);
