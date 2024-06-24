import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from '@/features/auth/auth.service';
import { PERMISSIONS } from '@/features/auth/constants';
import { PERMISSION_KEY } from '@/features/auth/decorators';
import { UserProfilesService } from '@/features/users/services';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userProfilesService: UserProfilesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<PERMISSIONS>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermission) return true;

    const { headers } = context.switchToHttp().getRequest();
    const token = headers.authorization.split(' ')[1];
    const { profile } = await this.authService.verifyJwt(token);
    const { permissions } = await this.userProfilesService.findOne(profile);
    return permissions.includes(requiredPermission);
  }
}
