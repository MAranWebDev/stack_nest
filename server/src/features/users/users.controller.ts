import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  CreateUserRoleDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  UpdateUserRoleDto,
} from '@/features/users/dtos';
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
    private readonly usersService: UsersService,
    private readonly userRolesService: UserRolesService,
  ) {}

  // users
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

  @Patch(':id')
  updatePassword(@Param('id') id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(id, updateUserPasswordDto);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string) {
    return this.usersService.updateStatus(id);
  }

  // user roles
  @Post(ROUTES.USERS_ROLES)
  createUserRole(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesService.create(createUserRoleDto);
  }

  @Get(ROUTES.USERS_ROLES)
  findAllUserRoles() {
    return this.userRolesService.findAll();
  }

  @Get(`${ROUTES.USERS_ROLES}/:id`)
  findOneUserRole(@Param('id') id: string) {
    return this.userRolesService.findOne(id);
  }

  @Patch(`${ROUTES.USERS_ROLES}/:id`)
  updateUserRole(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }

  @Patch(`${ROUTES.USERS_ROLES}/:id`)
  updateUserRoleStatus(@Param('id') id: string) {
    return this.userRolesService.updateStatus(id);
  }

  @Delete(`${ROUTES.USERS_ROLES}/:id`)
  removeUserRole(@Param('id') id: string) {
    return this.userRolesService.remove(id);
  }
}
