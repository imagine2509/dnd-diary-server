import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Party>;

@Schema()
export class Party {
  @Prop({ required: true })
  name: string;
}

export const PartySchema = SchemaFactory.createForClass(Party);
