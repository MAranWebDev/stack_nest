import { PropsWithChildren, createContext, useState } from 'react';

interface StateInitialValuesType {
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
}

interface ContextInitialValuesType extends StateInitialValuesType {
  changeValues: (props: PropsType) => void;
}

type PropsType = Partial<StateInitialValuesType>;

const stateInitialValues: StateInitialValuesType = {
  isPending: false,
  isError: false,
  errorMessage: '',
};

const contextInitialValues: ContextInitialValuesType = {
  ...stateInitialValues,
  changeValues: () => {},
};

export const LoadingBarContext = createContext(contextInitialValues);

export const LoadingBarProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState(stateInitialValues);

  const changeValues = (props: PropsType) => setValues((prevState) => ({ ...prevState, ...props }));

  const providerValues = { ...values, changeValues };

  return <LoadingBarContext.Provider value={providerValues}>{children}</LoadingBarContext.Provider>;
};
