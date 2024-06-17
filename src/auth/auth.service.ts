import bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<Types.ObjectId> {
    try {
      const user =
        await this.usersService.findUserByUsernameOrEmail(usernameOrEmail);
      if (!user) {
        throw new NotFoundException(`user ${usernameOrEmail} not found`);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new NotFoundException(
          `Password for user ${usernameOrEmail} is incorrect`,
        );
      }
      return user._id;
    } catch (error) {
      throw new Error(`Error validating user:${usernameOrEmail}`);
    }
  }

  async login(
    usernameOrEmail: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(usernameOrEmail, password);
    const payload = { username: user._id, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
