export type LOCAL_STORAGE = (typeof LOCAL_STORAGE)[keyof typeof LOCAL_STORAGE];

export const LOCAL_STORAGE = {
  JWT: 'jwt',
  USER: 'user',
  ROLE: 'role',
} as const;
