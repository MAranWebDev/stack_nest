import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { useContext } from 'react';

import { NavBarContext } from '@/features/nav-bar/NavBar.context';

export const NavBar = () => {
  const { isDarkMode, handleDarkMode } = useContext(NavBarContext);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Switch checked={isDarkMode} onClick={handleDarkMode} {...label} />
    </Box>
  );
};
