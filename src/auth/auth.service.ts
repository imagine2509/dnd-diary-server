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

  async login(userId: Types.ObjectId) {
    const user = await this.usersService.findUserById(userId);
    const payload = { username: user.username, pass: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
