import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BoatModelDocument = BoatModel & Document;

@Schema()
export class BoatModel {
  _id: any;

  @Prop()
  name: string;

  @Prop()
  sub_models: string[];

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;
}
export const BoatModelSchema = SchemaFactory.createForClass(BoatModel);
