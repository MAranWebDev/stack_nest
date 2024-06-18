import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserPermissions } from './user-permissions.schema';

export type UserProfilesDocument = HydratedDocument<UserProfiles>;

@Schema()
export class UserProfiles {
  @Prop()
  _id: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: String, ref: UserPermissions.name }], default: [] })
  permissions: string[];
}

export const UserProfilesSchema = SchemaFactory.createForClass(UserProfiles);
