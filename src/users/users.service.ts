import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/PrismaService/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserById(userId: string): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException();
    return user;
  }
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  updateUser(params: {
    userId: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { userId, data } = params;
    return this.prisma.user.update({ data, where: userId });
  }

  async deleteUser(userId: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where: userId,
    });
  }
}
