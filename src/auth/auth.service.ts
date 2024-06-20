import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/schemas/users.schema';
import { AccessToken } from './auth.types';
import { RegisterRequestDto } from './dto/register-request-dto';
import * as process from 'node:process';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<User & { _id: Types.ObjectId }> {
    const user: User & { _id: Types.ObjectId } =
      await this.usersService.findUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user: User & { _id: Types.ObjectId }): Promise<AccessToken> {
    const payload = { email: user.email, id: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = this.usersService.findUserByUsernameOrEmail(
      user.email,
    );
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(
      user.password,
      process.env.SALT_ROUNDS || 10,
    );
    const newUser: User = {
      ...user,
      password: hashedPassword,
      characterIds: [],
    };
    await this.usersService.createUser(newUser);
    const createdUser = await this.usersService.findUserByUsernameOrEmail(
      user.email,
    );
    return this.login(createdUser);
  }
}
