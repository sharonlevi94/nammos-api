import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  active: boolean;

  @Prop()
  full_name: string;

  @Prop()
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  password: string;

  @Prop()
  admin: boolean;

  @Prop()
  last_logged: Date;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
