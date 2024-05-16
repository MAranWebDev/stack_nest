import { PropsWithChildren, createContext, useState } from 'react';

const initialValues = {
  data: ['hola', 'chao'],
};

export const UsersContext = createContext(initialValues);

export const UsersProvider = ({ children }: PropsWithChildren) => {
  const [values] = useState(initialValues);

  return <UsersContext.Provider value={{ ...values }}>{children}</UsersContext.Provider>;
};
