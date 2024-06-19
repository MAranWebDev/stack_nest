import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserGuard } from '@/features/auth/guards';
import { ROUTES } from '@/features/users/constants';
import { UpdatePasswordDto, UpdateUserDto } from '@/features/users/dtos';
import { UsersService } from '@/features/users/services';

@ApiTags(ROUTES.USERS)
@ApiBearerAuth()
@Controller(ROUTES.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @RequirePermissions(PERMISSIONS.READ_USERS)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(UserGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(`${ROUTES.PASSWORD}/:id`)
  @UseGuards(UserGuard)
  updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Patch(`${ROUTES.STATUS}/:id`)
  @UseGuards(UserGuard)
  updateStatus(@Param('id') id: string) {
    return this.usersService.updateStatus(id);
  }
}
