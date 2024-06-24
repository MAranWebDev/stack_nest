import { SetMetadata } from '@nestjs/common';

import { PERMISSIONS } from '@/features/auth/constants';

export const PERMISSION_KEY = 'permission';
export const RequirePermission = (permission: PERMISSIONS) =>
  SetMetadata(PERMISSION_KEY, permission);
