import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Types } from 'mongoose';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    usernameOrEmail: string,
    password: string,
  ): Promise<Types.ObjectId> {
    const userId = await this.authService.validateUser(
      usernameOrEmail,
      password,
    );
    if (!userId) {
      throw new UnauthorizedException();
    }
    return userId;
  }
}
