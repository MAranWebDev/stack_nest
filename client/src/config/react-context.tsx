import { PropsWithChildren } from 'react';

import { AuthProvider } from '@/features/auth/Auth.context';
import { LoadingBarProvider } from '@/features/loading-bar/LoadingBar.context';
import { NavBarProvider } from '@/features/nav-bar/NavBar.context';
import { UsersProvider } from '@/features/users/Users.context';

export const ReactContextProvider = ({ children }: PropsWithChildren) => {
  const providers = [AuthProvider, UsersProvider, LoadingBarProvider, NavBarProvider];

  return providers.reduce(
    (accumulator, CurrentProvider) => <CurrentProvider>{accumulator}</CurrentProvider>,
    children,
  );
};
