export type ACTIONS = (typeof ACTIONS)[keyof typeof ACTIONS];

export const ACTIONS = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const;
