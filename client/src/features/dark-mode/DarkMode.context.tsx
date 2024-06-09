import { PropsWithChildren, createContext, useState } from 'react';

import { LOCAL_STORAGE } from './constants';
import { persistDarkMode } from './utils/persistDarkMode';

const stateInitialValue = localStorage.getItem(LOCAL_STORAGE.IS_DARK_MODE) === 'true' && true;

const contextInitialValues = {
  isDarkMode: stateInitialValue,
  handleDarkMode: () => {},
};

export const DarkModeContext = createContext(contextInitialValues);

export const DarkModeProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState(stateInitialValue);

  const handleDarkMode = () =>
    setIsDarkMode((prevState) => {
      const changedMode = !prevState;
      persistDarkMode(changedMode);
      return changedMode;
    });

  const providerValues = { isDarkMode, handleDarkMode };

  return <DarkModeContext.Provider value={providerValues}>{children}</DarkModeContext.Provider>;
};
