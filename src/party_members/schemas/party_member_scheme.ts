import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PartyMemberDocument = HydratedDocument<PartyMember>;

@Schema()
export class PartyMember {
  @Prop({ required: true })
  name: string;

  @Prop()
  notes: string;
}

export const PartyMemberSchema = SchemaFactory.createForClass(PartyMember);
