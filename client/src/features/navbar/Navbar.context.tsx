import { PropsWithChildren, createContext, useState } from 'react';

import { navbarService } from './navbar.service';
import { LOCAL_STORAGE } from './utils';

type StateInitialValuesType = typeof stateInitialValues;
type LoaderValuesType = Omit<Partial<StateInitialValuesType>, 'isDarkMode'>;
interface ContextInitialValuesType extends StateInitialValuesType {
  handleDarkMode: () => void;
  handleLoader: (loaderValues: LoaderValuesType) => void;
}

const stateInitialValues = {
  isDarkMode: localStorage.getItem(LOCAL_STORAGE.IS_DARK_MODE) === 'true' && true,
  isPending: false,
  isError: false,
  errorMessage: '',
};

const contextInitialValues: ContextInitialValuesType = {
  ...stateInitialValues,
  handleDarkMode: () => {},
  handleLoader: () => {},
};

export const NavbarContext = createContext(contextInitialValues);

export const NavbarProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState(stateInitialValues);

  const handleDarkMode = () =>
    setValues((prevState) => {
      const changedMode = !prevState.isDarkMode;
      navbarService.persist(changedMode);
      return { ...prevState, isDarkMode: changedMode };
    });

  const handleLoader = (loaderValues: LoaderValuesType) =>
    setValues((prevState) => ({ ...prevState, ...loaderValues }));

  const providerValues = { ...values, handleDarkMode, handleLoader };

  return <NavbarContext.Provider value={providerValues}>{children}</NavbarContext.Provider>;
};
