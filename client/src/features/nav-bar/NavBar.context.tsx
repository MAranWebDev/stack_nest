import { PropsWithChildren, createContext, useState } from 'react';

import { navBarService } from './navbar.service';
import { LOCAL_STORAGE } from './utils';

const stateInitialValue = localStorage.getItem(LOCAL_STORAGE.IS_DARK_MODE) === 'true' && true;

const contextInitialValues = {
  isDarkMode: stateInitialValue,
  handleDarkMode: () => {},
};

export const NavBarContext = createContext(contextInitialValues);

export const NavBarProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState(stateInitialValue);

  const handleDarkMode = () =>
    setIsDarkMode((prevState) => {
      const newMode = !prevState;
      navBarService.persist(newMode);
      return newMode;
    });

  const providerValues = { isDarkMode, handleDarkMode };

  return <NavBarContext.Provider value={providerValues}>{children}</NavBarContext.Provider>;
};
