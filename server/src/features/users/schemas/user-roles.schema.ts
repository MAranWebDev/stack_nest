import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserRolesDocument = HydratedDocument<UserRoles>;

@Schema()
export class UserRoles {
  @Prop({ type: String, unique: true })
  _id: string;

  @Prop({ required: true })
  name: string;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);
