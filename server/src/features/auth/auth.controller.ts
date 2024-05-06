import { Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
