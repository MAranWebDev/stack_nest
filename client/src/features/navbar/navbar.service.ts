import { LOCAL_STORAGE } from './constants';

export const navbarService = {
  persist(isDarkMode: boolean) {
    isDarkMode
      ? localStorage.setItem(LOCAL_STORAGE.IS_DARK_MODE, 'true')
      : localStorage.removeItem(LOCAL_STORAGE.IS_DARK_MODE);
  },
};
