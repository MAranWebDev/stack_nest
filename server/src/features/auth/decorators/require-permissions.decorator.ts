import { SetMetadata } from '@nestjs/common';

import { PERMISSIONS } from '@/features/auth/constants';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: PERMISSIONS[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
