import { PropsWithChildren } from 'react';

import { AuthProvider } from '@/features/auth/Auth.context';
import { UsersProvider } from '@/features/users/Users.context';

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
