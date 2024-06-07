import { PropsWithChildren, createContext, useCallback, useState } from 'react';

import { authService } from './auth.service';
import { LOCAL_STORAGE } from './constants';

type StateInitialValuesType = typeof stateInitialValues;
type ValuesType = Partial<StateInitialValuesType>;

interface ContextInitialValuesType extends StateInitialValuesType {
  handleValues: (values: ValuesType) => void;
  handleLogout: () => void;
}

const stateInitialValues = {
  jwt: localStorage.getItem(LOCAL_STORAGE.JWT) || '',
  user: localStorage.getItem(LOCAL_STORAGE.USER) || '',
  userRole: localStorage.getItem(LOCAL_STORAGE.ROLE) || '',
};

const contextInitialValues: ContextInitialValuesType = {
  ...stateInitialValues,
  handleValues: () => {},
  handleLogout: () => {},
};

export const AuthContext = createContext(contextInitialValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState(stateInitialValues);

  const _resetValues = () => setValues({ jwt: '', user: '', userRole: '' });

  const handleLogout = useCallback(() => {
    authService.logout();
    _resetValues();
  }, []);

  const handleValues = (values: ValuesType) =>
    setValues((prevState) => ({ ...prevState, ...values }));

  const providerValues = { ...values, handleValues, handleLogout };

  return <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>;
};
