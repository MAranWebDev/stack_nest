import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserRoles, UserRolesSchema, Users, UsersSchema } from './schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: UserRoles.name, schema: UserRolesSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
