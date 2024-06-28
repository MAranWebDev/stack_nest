import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_OWNER_KEY, PERMISSION_KEY } from '@/features/auth/decorators';
import { PERMISSIONS } from '@/features/users/constants';
import { UserProfilesService } from '@/features/users/services';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userProfilesService: UserProfilesService,
  ) {}

  private async hasRequiredPermission(profileId: string, requiredPermission: PERMISSIONS) {
    try {
      // Check if profile exists and return it
      const { permissions } = await this.userProfilesService.findOne(profileId);

      // Validate required permission
      return permissions.includes(requiredPermission);
    } catch (error) {
      return false;
    }
  }

  async canActivate(context: ExecutionContext) {
    const isOwner = this.reflector.getAllAndOverride<boolean>(IS_OWNER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredPermission = this.reflector.getAllAndOverride<PERMISSIONS>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isOwner && !requiredPermission) return true;

    const { params, user } = context.switchToHttp().getRequest();
    const { profileId, sub } = user;
    const isSameUserId = sub === params.id;

    if (isOwner && requiredPermission)
      return isSameUserId || this.hasRequiredPermission(profileId, requiredPermission);
    if (isOwner) return isSameUserId;
    if (requiredPermission) return this.hasRequiredPermission(profileId, requiredPermission);
    return false;
  }
}
