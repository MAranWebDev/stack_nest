import Box from '@mui/material/Box';

import { DarkModeSwitch } from './DarkModeSwitch';
import { LoadingBar } from './LoadingBar';
import { LogoutButton } from './LogoutButton';

export const Navbar = () => {
  return (
    <>
      <LoadingBar />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LogoutButton />
        <DarkModeSwitch />
      </Box>
    </>
  );
};
