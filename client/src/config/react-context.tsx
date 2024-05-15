import { PropsWithChildren } from 'react';

import { AuthProvider } from '@/features/auth';
import { UsersProvider } from '@/features/users';

const providers = [AuthProvider, UsersProvider];

export const ContextProvider = ({ children }: PropsWithChildren) => {
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
