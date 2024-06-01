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
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: Types.ObjectId) {
    return this.usersService.findUserById(userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: Types.ObjectId, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser(userId, data);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: Types.ObjectId) {
    return this.usersService.deleteUser(userId);
  }
}
