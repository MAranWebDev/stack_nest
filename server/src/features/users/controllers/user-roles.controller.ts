import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ROUTES } from '@/features/users/constants';
import { CreateUserRoleDto, UpdateUserRoleDto } from '@/features/users/dtos';
import { UserRolesService } from '@/features/users/services';

@ApiTags(ROUTES.USERS)
@ApiBearerAuth()
@Controller(ROUTES.USERS_ROLES)
export class UserRolesController {
  constructor(private userRolesService: UserRolesService) {}

  @Post()
  createUserRole(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesService.create(createUserRoleDto);
  }

  @Get()
  findAllUserRoles() {
    return this.userRolesService.findAll();
  }

  @Patch(':id')
  updateUserRole(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }
}
