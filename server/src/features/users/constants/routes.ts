export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];

export const ROUTES = {
  USERS: 'users',
  USERS_ROLES: 'users/roles',
} as const;
