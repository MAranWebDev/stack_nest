import { PropsWithChildren, createContext, useCallback, useState } from 'react';

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

export const LoadingContext = createContext(contextInitialValues);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState(stateInitialValues);

  const changeValues = useCallback(
    (props: PropsType) => setValues((prevState) => ({ ...prevState, ...props })),
    [],
  );

  const providerValues = { ...values, changeValues };

  return <LoadingContext.Provider value={providerValues}>{children}</LoadingContext.Provider>;
};
