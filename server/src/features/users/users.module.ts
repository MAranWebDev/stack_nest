import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserRolesController, UsersController } from './controllers';
import { UserRoles, UserRolesSchema, Users, UsersSchema } from './schemas';
import { UserRolesService, UsersService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: UserRoles.name, schema: UserRolesSchema },
    ]),
  ],
  controllers: [UsersController, UserRolesController],
  providers: [UsersService, UserRolesService],
  exports: [UsersService],
})
export class UsersModule {}
