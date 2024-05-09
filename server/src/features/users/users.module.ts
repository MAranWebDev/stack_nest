import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersConsumer } from './users.consumer';
import { UsersController } from './users.controller';
import { Users, UsersSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    BullModule.registerQueue({ name: 'users' }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersConsumer],
  exports: [UsersService],
})
export class UsersModule {}
