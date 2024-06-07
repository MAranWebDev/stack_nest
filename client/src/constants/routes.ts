type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];

export const ROUTES = {
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  HOME: '/',
  LOGIN: 'login',
  REGISTER: 'register',
  UNAUTHORIZED: 'unauthorized',
} as const;
