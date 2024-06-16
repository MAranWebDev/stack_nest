export type ROLES = (typeof ROLES)[keyof typeof ROLES];

export const ROLES = {
  ADMIN: 'ADMIN',
  DEFAULT: 'DEFAULT',
} as const;
