import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CharacterDocument = HydratedDocument<Party>;

@Schema()
export class Party {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'PartyPlaces' })
  partyPlaces: Types.ObjectId[];
}

export const PartySchema = SchemaFactory.createForClass(Party);
