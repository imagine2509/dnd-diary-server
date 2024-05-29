import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PartyNpcDocument = HydratedDocument<PartyNpc>;

@Schema()
export class PartyNpc {
  @Prop({ required: true })
  name: string;

  @Prop()
  notes?: string;
}

export const PartyNpcSchema = SchemaFactory.createForClass(PartyNpc);
