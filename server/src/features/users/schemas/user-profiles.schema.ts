import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserProfilesDocument = HydratedDocument<UserProfiles>;

@Schema()
export class UserProfiles {
  @Prop()
  _id: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: [] })
  permissions: string[];
}

export const UserProfilesSchema = SchemaFactory.createForClass(UserProfiles);
