import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { PROFILES } from '@/features/users/constants';

import { UserProfiles } from './user-profiles.schema';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, ref: UserProfiles.name, default: PROFILES.USER })
  profile: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
