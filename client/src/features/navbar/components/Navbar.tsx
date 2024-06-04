import Box from '@mui/material/Box';

import { DarkModeSwitch } from './DarkModeSwitch';
import { LoadingBar } from './LoadingBar';

export const Navbar = () => {
  return (
    <>
      <LoadingBar />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <DarkModeSwitch />
      </Box>
    </>
  );
};
