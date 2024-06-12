import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserRoleDto, UpdateUserDto, UpdateUserRoleDto } from '@/features/users/dtos';
import { UserRolesService, UsersService } from '@/features/users/services';

const ROUTES = {
  USERS: 'users',
  USERS_ROLES: 'users/roles',
} as const;

@ApiTags(ROUTES.USERS)
@ApiBearerAuth()
@Controller(ROUTES.USERS)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private userRolesService: UserRolesService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Post(ROUTES.USERS_ROLES)
  createUserRole(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesService.create(createUserRoleDto);
  }

  @Get(ROUTES.USERS_ROLES)
  findAllUserRoles() {
    return this.userRolesService.findAll();
  }

  @Patch(`${ROUTES.USERS_ROLES}/:id`)
  updateUserRole(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }
}
