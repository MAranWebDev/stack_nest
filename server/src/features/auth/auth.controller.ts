import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUserDto, LogUserDto } from '@/features/users/dtos';

import { AuthService } from './auth.service';
import { Public } from './decorators';

const ROUTES = {
  AUTH: 'auth',
  REGISTER: 'register',
  LOGIN: 'login',
} as const;

@ApiTags(ROUTES.AUTH)
@Public()
@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ROUTES.REGISTER)
  register(@Body() authUserDto: AuthUserDto) {
    return this.authService.register(authUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post(ROUTES.LOGIN)
  login(@Body() logUserDto: LogUserDto) {
    return this.authService.login(logUserDto);
  }
}
