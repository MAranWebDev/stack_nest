import { PropsWithChildren, createContext, useState } from 'react';

const contextInitialValues = {
  isLoading: false,
  setLoadingState: null as null | React.Dispatch<React.SetStateAction<boolean>>,
};

export const LoadingContext = createContext(contextInitialValues);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setLoadingState] = useState(false);

  const providerValues = {
    isLoading,
    setLoadingState,
  };

  return <LoadingContext.Provider value={providerValues}>{children}</LoadingContext.Provider>;
};
