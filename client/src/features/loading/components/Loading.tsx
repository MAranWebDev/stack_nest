import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { PropsWithChildren, useContext, useState } from 'react';

import { LoadingContext } from '@/features/loading/Loading.context';

type VisibilityType = `${VISIBILITY}`;

enum VISIBILITY {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export const Loading = ({ children }: PropsWithChildren) => {
  const { isPending, isError, errorMessage } = useContext(LoadingContext);
  const [isVisible, setIsVisibility] = useState<VisibilityType>(VISIBILITY.VISIBLE);

  const onClose = () => setIsVisibility(VISIBILITY.HIDDEN);

  return (
    <>
      <Box sx={{ position: 'absolute', right: 1, top: 1 }}>
        {isPending && <CircularProgress />}
        {isError && (
          <Alert sx={{ visibility: isVisible }} severity="error" onClose={onClose}>
            {errorMessage}
          </Alert>
        )}
      </Box>
      {children}
    </>
  );
};
