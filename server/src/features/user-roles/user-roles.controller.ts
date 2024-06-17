import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PERMISSIONS } from '@/features/auth/constants';
import { RequirePermissions } from '@/features/auth/decorators';

import { CreateUserRoleDto, UpdateUserRoleDto } from './dtos';
import { UserRolesService } from './user-roles.service';

const ROUTES = {
  USER_ROLES: 'user-roles',
} as const;

@ApiTags(ROUTES.USER_ROLES)
@ApiBearerAuth()
@Controller(ROUTES.USER_ROLES)
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post()
  @RequirePermissions(PERMISSIONS.CREATE_USER_ROLES)
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesService.create(createUserRoleDto);
  }

  @Get()
  @RequirePermissions(PERMISSIONS.READ_USER_ROLES)
  findAll() {
    return this.userRolesService.findAll();
  }

  @Get(':id')
  @RequirePermissions(PERMISSIONS.READ_USER_ROLES)
  findOne(@Param('id') id: string) {
    return this.userRolesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions(PERMISSIONS.UPDATE_USER_ROLES)
  update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }

  @Delete(':id')
  @RequirePermissions(PERMISSIONS.DELETE_USER_ROLES)
  remove(@Param('id') id: string) {
    return this.userRolesService.remove(id);
  }
}
