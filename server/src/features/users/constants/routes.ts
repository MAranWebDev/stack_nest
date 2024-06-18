export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];

export const ROUTES = {
  USERS: 'users',
  PASSWORD: 'password',
  STATUS: 'status',
  USER_PROFILES: 'user-profiles',
  USER_PERMISSIONS: 'user-permissions',
} as const;
