import { PropsWithChildren, createContext, useState } from 'react';

type StateInitialValuesType = typeof stateInitialValues;
type ValuesType = Partial<StateInitialValuesType>;

interface ContextInitialValuesType extends StateInitialValuesType {
  handleValues: (values: ValuesType) => void;
}

const stateInitialValues = {
  isPending: false,
  isError: false,
  errorMessage: '',
};

const contextInitialValues: ContextInitialValuesType = {
  ...stateInitialValues,
  handleValues: () => {},
};

export const LoadingContext = createContext(contextInitialValues);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState(stateInitialValues);

  const handleValues = (values: ValuesType) =>
    setValues((prevState) => ({ ...prevState, ...values }));

  const providerValues = { ...values, handleValues };

  return <LoadingContext.Provider value={providerValues}>{children}</LoadingContext.Provider>;
};
