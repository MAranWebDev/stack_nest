import { PropsWithChildren, createContext, useState } from 'react';

const stateInitialValues = {};
const contextInitialValues = {};

export const UsersContext = createContext(contextInitialValues);

export const UsersProvider = ({ children }: PropsWithChildren) => {
  const [values] = useState(stateInitialValues);

  const providerValues = { ...values };

  return <UsersContext.Provider value={providerValues}>{children}</UsersContext.Provider>;
};
