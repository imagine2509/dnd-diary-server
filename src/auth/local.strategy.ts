import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Types } from 'mongoose';
import { User } from "../users/schemas/users.schema";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    usernameOrEmail: string,
    password: string,
  ): Promise<User & {   _id: Types.ObjectId }> {
    const user = await this.authService.validateUser(
      usernameOrEmail,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
