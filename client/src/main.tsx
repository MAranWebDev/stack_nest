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
      {/* needs react query */}
      <ReactContextProvider>
        {/* needs react context */}
        <MuiThemeProvider>
          {/* needs all providers */}
          <RouterProvider router={reactRouter} />
        </MuiThemeProvider>
      </ReactContextProvider>
    </ReactQueryProvider>
  </React.StrictMode>,
);
