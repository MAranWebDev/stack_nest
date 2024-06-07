type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];

export const ROUTES = {
  HOME: '/',
  ADMIN: '/admin',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
} as const;
