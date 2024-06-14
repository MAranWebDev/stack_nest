import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserRoles, UserRolesSchema } from './schemas';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserRoles.name, schema: UserRolesSchema }])],
  controllers: [UserRolesController],
  providers: [UserRolesService],
  exports: [UserRolesService],
})
export class UserRolesModule {}
