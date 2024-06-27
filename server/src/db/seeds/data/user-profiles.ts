import { PERMISSIONS, PROFILES } from '@/features/users/constants';

export const userProfiles = [
  {
    _id: PROFILES.ADMIN,
    permissions: Object.values(PERMISSIONS),
  },
  {
    _id: PROFILES.USER,
    permissions: [
      PERMISSIONS.CREATE_SAMPLE,
      PERMISSIONS.READ_SAMPLE,
      PERMISSIONS.UPDATE_SAMPLE,
      PERMISSIONS.DELETE_SAMPLE,
    ],
  },
];
