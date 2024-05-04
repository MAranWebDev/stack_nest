import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { MainTheme } from './components/themes';
import { HomePage } from './pages/Home.page';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainTheme>
      <HomePage />
    </MainTheme>
  </React.StrictMode>,
);
