import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

export const CustomizedSwitches = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [mode, setMode] = useState(true);
  console.log(mode);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Switch checked={mode} {...label} onClick={() => setMode((prevState) => !prevState)} />
    </Box>
  );
};
