import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.createUser(data);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findUserById(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: Prisma.UserWhereUniqueInput,
    @Body() data: Prisma.UserUpdateInput,
  ) {
    return this.usersService.updateUser({ userId, data });
  }

  @Delete(':userId')
  remove(@Param('userId') userId: Prisma.UserWhereUniqueInput) {
    return this.usersService.deleteUser(userId);
  }
}
