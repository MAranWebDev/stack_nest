import { PropsWithChildren, createContext, useState } from 'react';

interface StateInitialValuesType {
  jwt: string | null;
  user: string | null;
  userRole: string | null;
}

interface ContextInitialValuesType extends StateInitialValuesType {
  changeValues: (props: PropsType) => void;
}

type PropsType = Partial<StateInitialValuesType>;

const stateInitialValues: StateInitialValuesType = {
  jwt: localStorage.getItem('jwt'),
  user: localStorage.getItem('user'),
  userRole: localStorage.getItem('role'),
};

const contextInitialValues: ContextInitialValuesType = {
  ...stateInitialValues,
  changeValues: () => {},
};

export const AuthContext = createContext(contextInitialValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState(stateInitialValues);

  const changeValues = (props: PropsType) => setValues((prevState) => ({ ...prevState, ...props }));

  const providerValues = { ...values, changeValues };

  return <AuthContext.Provider value={providerValues}>{children}</AuthContext.Provider>;
};
