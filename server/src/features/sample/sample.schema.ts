import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SampleDocument = HydratedDocument<Sample>;

@Schema()
export class Sample {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;
}

export const SampleSchema = SchemaFactory.createForClass(Sample);
