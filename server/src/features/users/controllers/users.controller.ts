import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Owner, RequirePermission } from '@/features/auth/decorators';
import { PERMISSIONS, ROUTES } from '@/features/users/constants';
import { UpdateUserDto, UpdateUserProfileDto } from '@/features/users/dtos';
import { UsersService } from '@/features/users/services';

@ApiTags(ROUTES.USERS)
@ApiBearerAuth()
@Controller(ROUTES.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @RequirePermission(PERMISSIONS.READ_USERS)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Owner()
  @RequirePermission(PERMISSIONS.READ_USERS)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Owner()
  @RequirePermission(PERMISSIONS.UPDATE_USERS)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(`${ROUTES.PROFILE}/:id`)
  @RequirePermission(PERMISSIONS.UPDATE_USERS_PROFILE)
  updateProfile(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.usersService.updateProfile(id, updateUserProfileDto);
  }
}
