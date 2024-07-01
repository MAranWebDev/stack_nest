import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_OWNER_KEY, PERMISSION_KEY } from '@/features/auth/decorators';
import { PERMISSIONS } from '@/features/users/constants';
import { UserProfilesService, UsersService } from '@/features/users/services';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
    private readonly userProfilesService: UserProfilesService,
  ) {}

  private async hasRequiredPermission(sub: string, requiredPermission: PERMISSIONS) {
    try {
      // Check if user and profile exists and return them
      const { profileId } = await this.usersService.findOne(sub);
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
    const { sub } = user;
    const isSameUserId = sub === params.id;

    if (isOwner && requiredPermission)
      return isSameUserId || this.hasRequiredPermission(sub, requiredPermission);
    if (isOwner) return isSameUserId;
    if (requiredPermission) return this.hasRequiredPermission(sub, requiredPermission);
    return false;
  }
}
