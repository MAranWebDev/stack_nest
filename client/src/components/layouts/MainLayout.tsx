import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ height: '100vh', overflow: 'auto' }} component="main">
      {children}
    </Box>
  );
};
