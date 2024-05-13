import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
