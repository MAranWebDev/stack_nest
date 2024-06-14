import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserRolesDocument = HydratedDocument<UserRoles>;

@Schema()
export class UserRoles {
  @Prop()
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);
