import { PropsWithChildren } from 'react';

import { AuthProvider } from '@/features/auth/Auth.context';
import { LoadingBarProvider } from '@/features/loading-bar/LoadingBar.context';
import { UsersProvider } from '@/features/users/Users.context';

export const ReactContextProvider = ({ children }: PropsWithChildren) => {
  const providers = [AuthProvider, UsersProvider, LoadingBarProvider];

  return (
    <>
      {providers.reduce(
        (accumulator, Current) => (
          <Current>{accumulator}</Current>
        ),
        children,
      )}
    </>
  );
};
