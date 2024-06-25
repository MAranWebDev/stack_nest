import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserProfilesController, UsersController } from './controllers';
import { UserProfiles, UserProfilesSchema, Users, UsersSchema } from './schemas';
import { UserProfilesService, UsersService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: UserProfiles.name, schema: UserProfilesSchema }]),
  ],
  controllers: [UsersController, UserProfilesController],
  providers: [UsersService, UserProfilesService],
  exports: [UsersService, UserProfilesService],
})
export class UsersModule {}
