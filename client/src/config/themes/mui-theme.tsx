import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PropsWithChildren, useContext } from 'react';

import { DarkModeContext } from '@/features/dark-mode/DarkMode.context';

export const MuiThemeProvider = ({ children }: PropsWithChildren) => {
  const { isDarkMode } = useContext(DarkModeContext);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
