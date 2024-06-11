import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LogUserDto } from '@/features/users/dtos';
import { UsersService } from '@/features/users/services';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(createUserDto.email);
    if (user) throw new BadRequestException('Email already exists');

    await this.usersService.create(createUserDto);

    return this.login(createUserDto);
  }

  async login(logUserDto: LogUserDto) {
    const user = await this.usersService.findOneByEmail(logUserDto.email);
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(logUserDto.password, user.password);
    if (!isMatch) throw new BadRequestException('Password does not match');

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const jwt = await this.jwtService.signAsync(payload);
    return { token: jwt };
  }
}
