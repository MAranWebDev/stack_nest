import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ROUTES } from '@/features/users/constants';
import { UpdateUserDto } from '@/features/users/dtos';
import { UsersService } from '@/features/users/services';

@ApiTags(ROUTES.USERS)
@ApiBearerAuth()
@Controller(ROUTES.USERS)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
