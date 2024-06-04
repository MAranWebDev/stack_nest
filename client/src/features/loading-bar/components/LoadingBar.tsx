import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';

import { LoadingBarContext } from '@/features/loading-bar/LoadingBar.context';

export const LoadingBar = () => {
  const { isPending, isError, errorMessage, changeValues } = useContext(LoadingBarContext);

  const onClose = () => changeValues({ isError: false, errorMessage: '' });

  return (
    <Box sx={{ position: 'absolute', right: 1, top: 1 }}>
      {isPending && <CircularProgress />}
      {isError && (
        <Alert severity="error" onClose={onClose}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};
