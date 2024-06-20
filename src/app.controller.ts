import {
  Controller,
  Dependencies,
  Bind,
  Get,
  Request,
  Post,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { User } from './users/schemas/users.schema';
import { Types } from 'mongoose';

@Dependencies(AuthService)
@Controller()
export class AppController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Bind(Request())
  async login(req: { usernameOrEmail: string; password: string }) {
    return this.authService.validateUser(req.usernameOrEmail, req.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Bind(Request())
  getProfile(req: User & { _id: Types.ObjectId }) {
    return req;
  }
}
