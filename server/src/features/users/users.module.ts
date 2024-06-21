import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@/features/auth/auth.module';

import { UserProfilesController, UsersController } from './controllers';
import { UserProfiles, UserProfilesSchema, Users, UsersSchema } from './schemas';
import { UserProfilesService, UsersService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([{ name: UserProfiles.name, schema: UserProfilesSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController, UserProfilesController],
  providers: [UsersService, UserProfilesService],
  exports: [UsersService],
})
export class UsersModule {}
