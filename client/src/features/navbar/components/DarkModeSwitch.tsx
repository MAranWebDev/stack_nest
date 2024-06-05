import Switch from '@mui/material/Switch';
import { useContext } from 'react';

import { NavbarContext } from '@/features/navbar/Navbar.context';

// ojo con esto
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const DarkModeSwitch = () => {
  const { isDarkMode, handleDarkMode } = useContext(NavbarContext);

  return <Switch checked={isDarkMode} onClick={handleDarkMode} {...label} />;
};
