import { Types } from 'mongoose';

export class CreatePartyPlaceDto {
  readonly name: string;
  readonly description: string;
  readonly partyIds: Types.ObjectId[];
}
