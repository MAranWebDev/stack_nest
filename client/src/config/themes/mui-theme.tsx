import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

import { Loading } from '@/features/loading/components';

export const MuiThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = createTheme({ palette: { mode: 'light' } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Loading>{children}</Loading>
    </ThemeProvider>
  );
};
