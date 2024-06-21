import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Inject,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UserDocument } from './users/schemas/users.schema';
import { RegisterRequestDto } from './auth/dto/register-request-dto';

@Controller()
export class AppController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() req: { usernameOrEmail: string; password: string }) {
    return this.authService.validateUser(req.usernameOrEmail, req.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: UserDocument) {
    return req;
  }

  @Post('auth/register')
  async register(@Body() req: RegisterRequestDto) {
    return this.authService.register(req);
  }
}
