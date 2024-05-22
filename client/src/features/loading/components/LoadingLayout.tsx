import CircularProgress from '@mui/material/CircularProgress';
import { PropsWithChildren, useContext } from 'react';

import { LoadingContext } from '@/features/loading/Loading.context';

export const LoadingLayout = ({ children }: PropsWithChildren) => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <>
      {isLoading && <CircularProgress />}
      {children}
    </>
  );
};
