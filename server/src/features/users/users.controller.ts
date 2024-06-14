import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  CreateUserRoleDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  UpdateUserRoleDto,
} from '@/features/users/dtos';
import { UserRolesService, UsersService } from '@/features/users/services';

const ROUTE_USERS = 'users';
const ROUTE_PASSWORD = 'password';
const ROUTE_STATUS = 'status';
const ROUTE_ROLES = 'roles';
const ROUTE_ROLE_STATUS = `${ROUTE_ROLES}/status`;

@ApiTags(ROUTE_USERS)
@ApiBearerAuth()
@Controller(ROUTE_USERS)
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

  @Patch(`${ROUTE_PASSWORD}/:id`)
  updatePassword(@Param('id') id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(id, updateUserPasswordDto);
  }

  @Patch(`${ROUTE_STATUS}/:id`)
  updateStatus(@Param('id') id: string) {
    return this.usersService.updateStatus(id);
  }

  // user roles
  @Post(ROUTE_ROLES)
  createUserRole(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesService.create(createUserRoleDto);
  }

  @Get(ROUTE_ROLES)
  findAllUserRoles() {
    return this.userRolesService.findAll();
  }

  @Get(`${ROUTE_ROLES}/:id`)
  findOneUserRole(@Param('id') id: string) {
    return this.userRolesService.findOne(id);
  }

  @Patch(`${ROUTE_ROLES}/:id`)
  updateUserRole(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }

  @Patch(`${ROUTE_ROLE_STATUS}/:id`)
  updateUserRoleStatus(@Param('id') id: string) {
    return this.userRolesService.updateStatus(id);
  }

  @Delete(`${ROUTE_ROLES}/:id`)
  removeUserRole(@Param('id') id: string) {
    return this.userRolesService.remove(id);
  }
}
