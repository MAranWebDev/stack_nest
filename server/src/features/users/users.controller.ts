import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '@/features/auth/decorators';
import { UpdateUserDto, UpdateUserPasswordDto } from '@/features/users/dtos';

import { UsersService } from './users.service';

const ROUTES = {
  USERS: 'users',
  PASSWORD: 'password',
  STATUS: 'status',
} as const;

@Roles(Role.Admin)
@ApiTags(ROUTES.USERS)
@ApiBearerAuth()
@Controller(ROUTES.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(`${ROUTES.PASSWORD}/:id`)
  updatePassword(@Param('id') id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(id, updateUserPasswordDto);
  }

  @Patch(`${ROUTES.STATUS}/:id`)
  updateStatus(@Param('id') id: string) {
    return this.usersService.updateStatus(id);
  }
}
