import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PROFILES } from '@/features/users/constants';
import { AuthUserDto, LogUserDto } from '@/features/users/dtos';
import { UsersService } from '@/features/users/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(authUserDto: AuthUserDto) {
    // Create user
    await this.usersService.create({ ...authUserDto, profileId: PROFILES.USER });

    // Log user and return jwt
    return this.login({
      email: authUserDto.email,
      password: authUserDto.password,
    });
  }

  async login(logUserDto: LogUserDto) {
    const user = await this.usersService.findOneByEmail(logUserDto.email);
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(logUserDto.password, user.password);
    if (!isMatch) throw new BadRequestException('Password does not match');

    const payload = {
      sub: user._id,
      name: user.name,
      email: user.email,
      profileId: user.profileId,
    };

    const jwt = await this.jwtService.signAsync(payload);
    return { token: jwt };
  }

  async verifyJwt(jwt: string) {
    const secret = this.configService.get('JWT_SECRET');

    try {
      return await this.jwtService.verifyAsync(jwt, { secret });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
