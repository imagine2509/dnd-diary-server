import { Types } from 'mongoose';

export class UpdateUserDto {
  readonly username?: string;
  readonly email?: string;
  readonly password?: string;
  readonly characterIds?: Types.ObjectId[];
}
