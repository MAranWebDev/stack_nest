export const ROLES = {
  USER: 'user',
  EDITOR: 'editor',
  ADMIN: 'admin',
} as const;

export type RolesType = (typeof ROLES)[keyof typeof ROLES];
