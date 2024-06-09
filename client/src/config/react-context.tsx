import { PropsWithChildren } from 'react';

import { AuthProvider } from '@/features/auth/Auth.context';
import { DarkModeProvider } from '@/features/dark-mode/DarkMode.context';
import { LoadingProvider } from '@/features/loading/Loading.context';

export const ReactContextProvider = ({ children }: PropsWithChildren) => {
  const providers = [DarkModeProvider, LoadingProvider, AuthProvider];

  return providers.reduce(
    (accumulator, CurrentProvider) => <CurrentProvider>{accumulator}</CurrentProvider>,
    children,
  );
};
