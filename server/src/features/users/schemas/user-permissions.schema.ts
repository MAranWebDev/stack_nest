import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserPermissionsDocument = HydratedDocument<UserPermissions>;

@Schema()
export class UserPermissions {
  @Prop()
  _id: string;

  @Prop({ required: true })
  description: string;
}

export const UserPermissionsSchema = SchemaFactory.createForClass(UserPermissions);
