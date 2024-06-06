import { PropsWithChildren, createContext, useState } from 'react';

import { LOCAL_STORAGE } from './constants';

type StateInitialValuesType = typeof stateInitialValues;
type ValuesType = Partial<StateInitialValuesType>;

interface ContextInitialValuesType extends StateInitialValuesType {
  handleValues: (values: ValuesType) => void;
}

const stateInitialValues = {
  jwt: localStorage.getItem(LOCAL_STORAGE.JWT) || '',
  user: localStorage.getItem(LOCAL_STORAGE.USER) || '',
  userRole: localStorage.getItem(LOCAL_STORAGE.ROLE) || '',
};

const contextInitialValues: ContextInitialValuesType = {
  ...stateInitialValues,
  handleValues: () => {},
};

export const AuthContext = createContext(contextInitialValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState(stateInitialValues);

  const handleValues = (values: ValuesType) =>
    setValues((prevState) => ({ ...prevState, ...values }));

  const providerValues = { ...values, handleValues };

  return <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>;
};
