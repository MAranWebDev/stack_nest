import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserRolesDocument = HydratedDocument<UserRoles>;

@Schema()
export class UserRoles {
  @Prop({ required: true, unique: true })
  name: string;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);
