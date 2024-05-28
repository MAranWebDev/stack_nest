import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto, LogUserDto } from '@/features/users/dtos';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

enum ROUTES {
  AUTH = 'auth',
  REGISTER = 'register',
  LOGIN = 'login',
}

@ApiTags(ROUTES.AUTH)
@Public()
@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(ROUTES.REGISTER)
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post(ROUTES.LOGIN)
  login(@Body() logUserDto: LogUserDto) {
    return this.authService.login(logUserDto);
  }
}
