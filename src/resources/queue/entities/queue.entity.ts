import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type QueueDocument = Queue & Document;

@Schema()
export class Queue {
  _id: any;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop()
  created_at: Date;

  @Prop()
  deleted_at: Date;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
