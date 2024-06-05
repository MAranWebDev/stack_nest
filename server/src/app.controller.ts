import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Public } from './features/auth/utils/decorators';

const ROUTES = {
  ROOT: 'root',
} as const;

@ApiTags(ROUTES.ROOT)
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
