import { PropsWithChildren } from 'react';

import { AuthProvider } from '@/features/auth/Auth.context';
import { NavbarProvider } from '@/features/navbar/Navbar.context';
import { UsersProvider } from '@/features/users/Users.context';

export const ReactContextProvider = ({ children }: PropsWithChildren) => {
  const providers = [NavbarProvider, AuthProvider, UsersProvider];

  return providers.reduce(
    (accumulator, CurrentProvider) => <CurrentProvider>{accumulator}</CurrentProvider>,
    children,
  );
};
