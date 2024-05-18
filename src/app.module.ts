import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { PartiesModule } from './parties/parties.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/dnd-diary-database'),
    UsersModule,
    CharactersModule,
    PartiesModule,
  ],
})
export class AppModule {}
