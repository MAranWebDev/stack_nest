import { PropsWithChildren, createContext, useState } from 'react';

type StateInitialValuesType = typeof stateInitialValues;
type ValuesType = Partial<StateInitialValuesType>;

interface ContextInitialValuesType extends StateInitialValuesType {
  changeValues: (values: ValuesType) => void;
}

const stateInitialValues = { isPending: false, isError: false, errorMessage: '' };

const contextInitialValues: ContextInitialValuesType = {
  ...stateInitialValues,
  changeValues: () => {},
};

export const LoadingBarContext = createContext(contextInitialValues);

export const LoadingBarProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState(stateInitialValues);

  const changeValues = (values: ValuesType) =>
    setValues((prevState) => ({ ...prevState, ...values }));

  const providerValues = { ...values, changeValues };

  return <LoadingBarContext.Provider value={providerValues}>{children}</LoadingBarContext.Provider>;
};
