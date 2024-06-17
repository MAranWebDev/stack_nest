export type ROLES = (typeof ROLES)[keyof typeof ROLES];

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;
