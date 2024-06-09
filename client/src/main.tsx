import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { ReactContextProvider } from './config/react-context';
import { ReactQueryProvider } from './config/react-query';
import { reactRouter } from './config/react-router';
import { MuiThemeProvider } from './config/themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ReactContextProvider>
        <MuiThemeProvider>
          <RouterProvider router={reactRouter} />
        </MuiThemeProvider>
      </ReactContextProvider>
    </ReactQueryProvider>
  </React.StrictMode>,
);
