import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PrismaService } from './PrismaService/prisma.service';
import { PrismaModule } from './PrismaService/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class AppModule {}
