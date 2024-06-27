import { Module } from '@nestjs/common';

import { UsersModule } from '@/features/users/users.module';

import { SeedsService } from './seeds.service';

@Module({
  imports: [UsersModule],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
