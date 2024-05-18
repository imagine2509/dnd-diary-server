import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<PartyPlace>;

@Schema()
export class PartyPlace {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const PartyPlaceSchema = SchemaFactory.createForClass(PartyPlace);
