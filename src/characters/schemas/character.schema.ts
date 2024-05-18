import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema()
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  race: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true })
  level: number;

  @Prop({ type: Types.ObjectId, ref: 'Party' })
  partyIds: Types.ObjectId[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
