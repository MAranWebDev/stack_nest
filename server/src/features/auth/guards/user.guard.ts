import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from '@/features/auth/auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers, params } = context.switchToHttp().getRequest();
    const jwt = headers.authorization.split(' ')[1];
    return this.authService.validateJwtSub(jwt, params.id);
  }
}
