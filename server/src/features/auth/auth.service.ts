import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LogUserDto } from '../users/dtos';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  login(logUserDto: LogUserDto) {
    return { data: logUserDto };
  }
}
