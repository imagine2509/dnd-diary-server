import {
  Controller,
  Dependencies,
  Get,
  Request,
  Post,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UserDocument } from './users/schemas/users.schema';

@Dependencies(AuthService)
@Controller()
export class AppController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: { usernameOrEmail: string; password: string }) {
    return this.authService.validateUser(req.usernameOrEmail, req.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: UserDocument) {
    return req;
  }
}
