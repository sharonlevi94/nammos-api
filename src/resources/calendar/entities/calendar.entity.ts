import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type CalendarDocument = Calendar & Document;

@Schema()
export class Calendar {
  _id: any;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop()
  date: string;

  @Prop()
  time: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;
}
export const CalendarSchema = SchemaFactory.createForClass(Calendar);
