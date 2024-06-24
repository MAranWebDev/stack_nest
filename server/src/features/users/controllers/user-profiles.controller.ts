import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PERMISSIONS } from '@/features/auth/constants';
import { RequirePermission } from '@/features/auth/decorators';
import { ROUTES } from '@/features/users/constants';
import { CreateUserProfileDto, UpdateUserProfileDto } from '@/features/users/dtos';
import { UserProfilesService } from '@/features/users/services';

@ApiTags(ROUTES.USER_PROFILES)
@ApiBearerAuth()
@Controller(ROUTES.USER_PROFILES)
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Post()
  @RequirePermission(PERMISSIONS.CREATE_USER_PROFILES)
  create(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userProfilesService.create(createUserProfileDto);
  }

  @Get()
  @RequirePermission(PERMISSIONS.READ_USER_PROFILES)
  findAll() {
    return this.userProfilesService.findAll();
  }

  @Get(':id')
  @RequirePermission(PERMISSIONS.READ_USER_PROFILES)
  findOne(@Param('id') id: string) {
    return this.userProfilesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermission(PERMISSIONS.UPDATE_USER_PROFILES)
  update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.userProfilesService.update(id, updateUserProfileDto);
  }

  @Delete(':id')
  @RequirePermission(PERMISSIONS.DELETE_USER_PROFILES)
  remove(@Param('id') id: string) {
    return this.userProfilesService.remove(id);
  }
}
