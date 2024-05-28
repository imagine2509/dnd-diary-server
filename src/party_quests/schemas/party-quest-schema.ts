import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PartyQuestDocument = HydratedDocument<PartyQuest>;

@Schema()
export class PartyQuest {
  @Prop({ required: true })
  name: string;

  @Prop()
  notes?: string;
}

export const PartyQuestSchema = SchemaFactory.createForClass(PartyQuest);
