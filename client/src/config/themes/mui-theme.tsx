import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PropsWithChildren, useState } from 'react';

import { Loading } from '@/features/loading/components';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const MuiThemeProvider = ({ children }: PropsWithChildren) => {
  const [checked, setChecked] = useState(true);
  const mode = checked ? 'light' : 'dark';
  const theme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Switch
          checked={checked}
          {...label}
          onClick={() => setChecked((prevState) => !prevState)}
        />
      </Box>
      <Loading>{children}</Loading>
    </ThemeProvider>
  );
};
