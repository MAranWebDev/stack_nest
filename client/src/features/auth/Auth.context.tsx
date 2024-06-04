import { PropsWithChildren, createContext, useState } from 'react';

import { LOCAL_STORAGE } from './types';

interface StateInitialValuesType {
  jwt: string | null;
  user: string | null;
  userRole: string | null;
}

interface ContextInitialValuesType extends StateInitialValuesType {
  handleValues: (props: PropsType) => void;
}

type PropsType = Partial<StateInitialValuesType>;

const stateInitialValues: StateInitialValuesType = {
  jwt: localStorage.getItem(LOCAL_STORAGE.JWT),
  user: localStorage.getItem(LOCAL_STORAGE.USER),
  userRole: localStorage.getItem(LOCAL_STORAGE.ROLE),
};

const contextInitialValues: ContextInitialValuesType = {
  ...stateInitialValues,
  handleValues: () => {},
};

export const AuthContext = createContext(contextInitialValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState(stateInitialValues);

  const handleValues = (props: PropsType) => setValues((prevState) => ({ ...prevState, ...props }));

  const providerValues = { ...values, handleValues };

  return <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>;
};
