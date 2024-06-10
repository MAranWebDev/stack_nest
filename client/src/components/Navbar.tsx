import Box from '@mui/material/Box';

import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { DarkModeSwitch } from '@/features/dark-mode/components/DarkModeSwitch';

export const Navbar = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <LogoutButton />
      <DarkModeSwitch />
    </Box>
  );
};
