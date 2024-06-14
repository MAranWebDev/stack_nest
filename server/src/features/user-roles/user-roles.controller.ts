import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserRoleDto, UpdateUserRoleDto } from './dtos';
import { UserRolesService } from './user-roles.service';

const ROUTES = {
  USER_ROLES: 'user-roles',
  STATUS: 'status',
} as const;

@ApiTags(ROUTES.USER_ROLES)
@ApiBearerAuth()
@Controller(ROUTES.USER_ROLES)
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesService.create(createUserRoleDto);
  }

  @Get()
  findAll() {
    return this.userRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }

  @Patch(`${ROUTES.STATUS}/:id`)
  updateStatus(@Param('id') id: string) {
    return this.userRolesService.updateStatus(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRolesService.remove(id);
  }
}
