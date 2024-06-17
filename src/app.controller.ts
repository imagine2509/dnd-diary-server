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

export interface CustomRequest extends Request {
  usernameOrEmail: string;
  password: string;
}

@Dependencies(AuthService)
@Controller()
export class AppController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Bind(Request())
  async login(req: CustomRequest) {
    return this.authService.login(req.usernameOrEmail, req.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Bind(Request())
  getProfile(req: CustomRequest) {
    return req.usernameOrEmail;
  }
}
