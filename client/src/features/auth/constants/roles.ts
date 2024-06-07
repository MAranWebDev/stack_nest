export type ROLES = (typeof ROLES)[keyof typeof ROLES];

export const ROLES = {
  DEFAULT: 'DEFAULT',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
} as const;
