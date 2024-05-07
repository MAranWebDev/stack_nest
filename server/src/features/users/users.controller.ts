import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
