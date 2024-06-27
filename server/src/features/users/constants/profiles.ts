export type PROFILES = (typeof PROFILES)[keyof typeof PROFILES];

export const PROFILES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;
