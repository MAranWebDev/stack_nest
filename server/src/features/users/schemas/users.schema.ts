import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserRoles } from '@/features/user-roles/schemas';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: String, ref: UserRoles.name, default: 'DEFAULT' })
  role: UserRoles;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
