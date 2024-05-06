import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LogUserDto } from '../users/dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() logUserDto: LogUserDto) {
    return this.authService.login(logUserDto);
  }
}
