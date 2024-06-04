import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';

import { NavbarContext } from '@/features/navbar/Navbar.context';

export const LoadingBar = () => {
  const { isPending, isError, errorMessage, handleLoader } = useContext(NavbarContext);

  return (
    <Box sx={{ position: 'absolute', right: 1, top: 1 }}>
      {isPending && <CircularProgress />}
      {isError && (
        <Alert severity="error" onClose={() => handleLoader({ isError: false, errorMessage: '' })}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};
