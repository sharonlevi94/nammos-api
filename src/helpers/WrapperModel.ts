import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class WrapperModel {
  _id: any;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;
}
