import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PartyDocument = HydratedDocument<Party>;

@Schema()
export class Party {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'PartyPlaces' })
  partyPlaces: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'PartyMembers' })
  partyMembers: Types.ObjectId[];
}

export const PartySchema = SchemaFactory.createForClass(Party);
