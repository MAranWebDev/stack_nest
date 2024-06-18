import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RequirePermissions } from '@/features/auth/decorators';
import { PERMISSIONS, ROUTES } from '@/features/users/constants';
import { CreateUserPermissionDto, UpdateUserPermissionDto } from '@/features/users/dtos';
import { UserPermissionsService } from '@/features/users/services';

@ApiTags(ROUTES.USER_PERMISSIONS)
@ApiBearerAuth()
@Controller(ROUTES.USER_PERMISSIONS)
export class UserPermissionsController {
  constructor(private readonly userPermissionsService: UserPermissionsService) {}

  @Post()
  @RequirePermissions(PERMISSIONS.CREATE_USER_PERMISSIONS)
  create(@Body() createUserPermissionDto: CreateUserPermissionDto) {
    return this.userPermissionsService.create(createUserPermissionDto);
  }

  @Get()
  @RequirePermissions(PERMISSIONS.READ_USER_PERMISSIONS)
  findAll() {
    return this.userPermissionsService.findAll();
  }

  @Get(':id')
  @RequirePermissions(PERMISSIONS.READ_USER_PERMISSIONS)
  findOne(@Param('id') id: string) {
    return this.userPermissionsService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions(PERMISSIONS.UPDATE_USER_PERMISSIONS)
  update(@Param('id') id: string, @Body() updateUserPermissionDto: UpdateUserPermissionDto) {
    return this.userPermissionsService.update(id, updateUserPermissionDto);
  }

  @Delete(':id')
  @RequirePermissions(PERMISSIONS.DELETE_USER_PERMISSIONS)
  remove(@Param('id') id: string) {
    return this.userPermissionsService.remove(id);
  }
}
