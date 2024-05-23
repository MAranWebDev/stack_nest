import { PropsWithChildren, createContext, useState } from 'react';

const contextInitialValues = {
  jwt: '',
  user: '',
};

export const AuthContext = createContext(contextInitialValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [values] = useState(contextInitialValues);

  const providerValues = { ...values };

  return <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>;
};
