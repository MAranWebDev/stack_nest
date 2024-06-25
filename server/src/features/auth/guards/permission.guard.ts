import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from '@/features/auth/auth.service';
import { IS_OWNER_KEY, PERMISSION_KEY } from '@/features/auth/decorators';
import { PERMISSIONS } from '@/features/users/constants';
import { UserProfilesService } from '@/features/users/services';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userProfilesService: UserProfilesService,
  ) {}

  private async hasRequiredPermission(profileId: string, requiredPermission: PERMISSIONS) {
    const { permissions } = await this.userProfilesService.findOne(profileId);
    return permissions.includes(requiredPermission);
  }

  async canActivate(context: ExecutionContext) {
    const requiredPermission = this.reflector.getAllAndOverride<PERMISSIONS>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isOwner = this.reflector.getAllAndOverride<boolean>(IS_OWNER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermission && !isOwner) return true;

    const { headers, params, user } = context.switchToHttp().getRequest();
    const jwt = headers.authorization.split(' ')[1];
    const { profile, sub } = await this.authService.verifyJwt(jwt);
    console.log(user); // ojo con esto

    if (requiredPermission && isOwner)
      return this.hasRequiredPermission(profile, requiredPermission) || sub === params.id;
    if (requiredPermission) return this.hasRequiredPermission(profile, requiredPermission);
    if (isOwner) return sub === params.id;
    return false;
  }
}
