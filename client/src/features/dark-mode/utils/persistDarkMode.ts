import { LOCAL_STORAGE } from '@/features/dark-mode/constants';

export const persistDarkMode = (isDarkMode: boolean) =>
  isDarkMode
    ? localStorage.setItem(LOCAL_STORAGE.IS_DARK_MODE, 'true')
    : localStorage.removeItem(LOCAL_STORAGE.IS_DARK_MODE);
