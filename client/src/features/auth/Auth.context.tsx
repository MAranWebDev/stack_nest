import { PropsWithChildren, createContext, useState } from 'react';

const initialValues = {
  jwt: '',
  user: '',
};

export const AuthContext = createContext(initialValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [values] = useState(initialValues);

  return <AuthContext.Provider value={{ ...values }}>{children}</AuthContext.Provider>;
};
