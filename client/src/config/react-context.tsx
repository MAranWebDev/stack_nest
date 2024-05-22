import { PropsWithChildren } from 'react';

import { AuthProvider } from '@/features/auth/Auth.context';
import { LoadingProvider } from '@/features/loading/Loading.context';
import { UsersProvider } from '@/features/users/Users.context';

export const ReactContextProvider = ({ children }: PropsWithChildren) => {
  const providers = [AuthProvider, UsersProvider, LoadingProvider];

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
