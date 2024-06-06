export type ROLES = (typeof ROLES)[keyof typeof ROLES];

export const ROLES = {
  USER: 'user',
  EDITOR: 'editor',
  ADMIN: 'admin',
} as const;
