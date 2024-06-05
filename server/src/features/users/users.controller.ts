import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserRoleDto } from './dtos';
import { UsersService } from './users.service';

const ROUTES = {
  USERS: 'users',
  ROLES: 'roles',
} as const;

@ApiTags(ROUTES.USERS)
@ApiBearerAuth()
@Controller(ROUTES.USERS)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(ROUTES.ROLES)
  findAllRoles() {
    return this.usersService.findAllRoles();
  }

  @Post(ROUTES.ROLES)
  createUserRole(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.usersService.createUserRole(createUserRoleDto);
  }
}
