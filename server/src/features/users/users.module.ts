import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserRoles, UserRolesSchema, Users, UsersSchema } from './schemas';
import { UserRolesService, UsersService } from './services';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: UserRoles.name, schema: UserRolesSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRolesService],
  exports: [UsersService],
})
export class UsersModule {}
