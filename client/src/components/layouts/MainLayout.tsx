import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';

import { Navbar } from '@/components/Navbar';
import { LoadingBar } from '@/features/loading/components';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <LoadingBar />
      <Navbar />
      <Box sx={{ height: '100vh', overflow: 'auto' }} component="main">
        {children}
      </Box>
    </>
  );
};
