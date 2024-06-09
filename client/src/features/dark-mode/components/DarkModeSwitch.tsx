import Switch from '@mui/material/Switch';
import { useContext } from 'react';

import { DarkModeContext } from '@/features/dark-mode/DarkMode.context';

// ojo con esto
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const DarkModeSwitch = () => {
  const { isDarkMode, handleDarkMode } = useContext(DarkModeContext);

  return <Switch checked={isDarkMode} onClick={handleDarkMode} {...label} />;
};
