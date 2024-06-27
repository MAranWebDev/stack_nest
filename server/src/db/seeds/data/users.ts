import { PROFILES } from '@/features/users/constants';

export const users = [
  {
    name: 'Admin',
    email: 'admin@admin.com',
    password: '1234',
    profileId: PROFILES.ADMIN,
  },
  {
    name: 'User',
    email: 'user@user.com',
    password: '1234',
    profileId: PROFILES.USER,
  },
];
