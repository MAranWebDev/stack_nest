import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';

import { LoadingContext } from '@/features/loading/Loading.context';

export const LoadingBar = () => {
  const { isPending, isError, errorMessage, handleValues } = useContext(LoadingContext);

  return (
    <Box sx={{ position: 'absolute', right: 1, top: 1 }}>
      {isPending && <CircularProgress />}
      {isError && (
        <Alert severity="error" onClose={() => handleValues({ isError: false, errorMessage: '' })}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};
