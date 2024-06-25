import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { PERMISSIONS } from '@/features/users/constants';

export type UserProfilesDocument = HydratedDocument<UserProfiles>;

@Schema()
export class UserProfiles {
  @Prop()
  _id: string;

  @Prop({ default: () => Object.values(PERMISSIONS) })
  permissions: string[];
}

export const UserProfilesSchema = SchemaFactory.createForClass(UserProfiles);
