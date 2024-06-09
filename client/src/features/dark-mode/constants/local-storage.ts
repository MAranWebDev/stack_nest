export type LOCAL_STORAGE = (typeof LOCAL_STORAGE)[keyof typeof LOCAL_STORAGE];

export const LOCAL_STORAGE = {
  IS_DARK_MODE: 'is_dark_mode',
} as const;
