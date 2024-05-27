import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { UserRoles } from './user-roles.schema';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserRoles.name, required: true })
  role: UserRoles;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
