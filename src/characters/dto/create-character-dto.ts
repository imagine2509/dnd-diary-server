import { Types } from 'mongoose';

export class CreateCharacterDto {
  readonly name: string;
  readonly race: string;
  readonly class: string;
  readonly level: number;
  readonly partyIds: Types.ObjectId[];
}
