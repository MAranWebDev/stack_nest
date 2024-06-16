export type ROLES = (typeof ROLES)[keyof typeof ROLES];

export const ROLES = {
  ADMIN: 'admin',
  DEFAULT: 'default',
} as const;
