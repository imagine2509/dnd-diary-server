import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserDocument } from '../users/schemas/users.schema';
import { AccessToken } from './auth.types';
import { RegisterRequestDto } from './dto/register-request-dto';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<UserDocument> {
    const user =
      await this.usersService.findUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password does not match');
    }
    return user;
  }

  async login(user: UserDocument): Promise<AccessToken> {
    const payload = { email: user.email, id: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findUserByUsernameOrEmail(
      user.email,
    );
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(process.env.SALT_ROUNDS) || 10,
    );
    const newUser = {
      ...user,
      password: hashedPassword,
      characterIds: [],
    } as const;

    await this.usersService.createUser(newUser);
    const createdUser = await this.usersService.findUserByUsernameOrEmail(
      user.email,
    );
    return this.login(createdUser);
  }
}
