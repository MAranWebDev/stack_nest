import { PropsWithChildren, createContext, useState } from 'react';

const contextInitialValues = {
  data: ['hola', 'chao'],
};

export const UsersContext = createContext(contextInitialValues);

export const UsersProvider = ({ children }: PropsWithChildren) => {
  const [values] = useState(contextInitialValues);

  const providerValues = { ...values };

  return <UsersContext.Provider value={providerValues}>{children}</UsersContext.Provider>;
};
