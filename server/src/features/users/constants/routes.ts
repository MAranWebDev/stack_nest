export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];

export const ROUTES = {
  USERS: 'users',
  PROFILE: 'profile',
  USER_PROFILES: 'user-profiles',
} as const;
