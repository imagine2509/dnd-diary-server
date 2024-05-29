import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PartyGameDocument = HydratedDocument<PartyGame>;

@Schema()
export class PartyGame {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  notes?: string;
}

export const PartyGameSchema = SchemaFactory.createForClass(PartyGame);
