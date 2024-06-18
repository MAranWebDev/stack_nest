import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserPermissionsController, UserProfilesController, UsersController } from './controllers';
import {
  UserPermissions,
  UserPermissionsSchema,
  UserProfiles,
  UserProfilesSchema,
  Users,
  UsersSchema,
} from './schemas';
import { UserPermissionsService, UserProfilesService, UsersService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: UserProfiles.name, schema: UserProfilesSchema }]),
    MongooseModule.forFeature([{ name: UserPermissions.name, schema: UserPermissionsSchema }]),
  ],
  controllers: [UsersController, UserProfilesController, UserPermissionsController],
  providers: [UsersService, UserProfilesService, UserPermissionsService],
  exports: [UsersService],
})
export class UsersModule {}
