import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { PropsWithChildren, useContext } from 'react';

import { LoadingContext } from '@/features/loading/Loading.context';

export const Loading = ({ children }: PropsWithChildren) => {
  const { isPending, isError, errorMessage, changeValues } = useContext(LoadingContext);

  return (
    <>
      <Box sx={{ position: 'absolute', right: 1, top: 1 }}>
        {isPending && <CircularProgress />}
        {isError && (
          <Alert
            severity="error"
            onClose={() => changeValues({ isError: false, errorMessage: '' })}
          >
            {errorMessage}
          </Alert>
        )}
      </Box>
      {children}
    </>
  );
};
