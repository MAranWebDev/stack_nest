import { PropsWithChildren } from 'react';

import { AuthProvider } from '@/features/auth';
import { UsersProvider } from '@/features/users';

export const ReactContextProvider = ({ children }: PropsWithChildren) => {
  const providers = [AuthProvider, UsersProvider];

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
