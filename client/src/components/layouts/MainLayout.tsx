import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';

import { Navbar } from '@/features/navbar/components';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <Box sx={{ height: '100vh', overflow: 'auto' }} component="main">
        {children}
      </Box>
    </>
  );
};
