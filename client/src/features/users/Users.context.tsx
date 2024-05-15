import { PropsWithChildren, createContext, useState } from 'react';

export interface UsersContextType {
  data: string[];
}

export const UsersContext = createContext<UsersContextType>({ data: [] });

export const UsersProvider = ({ children }: PropsWithChildren) => {
  const [data] = useState(['hola', 'chao']);

  return <UsersContext.Provider value={{ data }}>{children}</UsersContext.Provider>;
};
