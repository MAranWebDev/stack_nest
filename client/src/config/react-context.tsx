import { PropsWithChildren } from 'react';

import { AuthProvider } from '@/features/auth/Auth.context';
import { NavbarProvider } from '@/features/navbar/Navbar.context';

export const ReactContextProvider = ({ children }: PropsWithChildren) => {
  const providers = [NavbarProvider, AuthProvider];

  return providers.reduce(
    (accumulator, CurrentProvider) => <CurrentProvider>{accumulator}</CurrentProvider>,
    children,
  );
};
