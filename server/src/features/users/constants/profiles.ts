export type PROFILES = (typeof PROFILES)[keyof typeof PROFILES];

export const PROFILES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;
