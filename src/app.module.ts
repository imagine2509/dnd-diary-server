import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { PartiesModule } from './parties/parties.module';
import { PartyPlaceModule } from './party_place/party_place.module';
import { PartyMembersModule } from './party_members/party_members.module';
import { PartyGamesModule } from './party_games/party_games.module';
import { PartyQuestsModule } from './party_quests/party_quests.module';
import { PartyNpcsModule } from './party_npcs/party_npcs.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
    CharactersModule,
    PartiesModule,
    PartyPlaceModule,
    PartyMembersModule,
    PartyGamesModule,
    PartyQuestsModule,
    PartyNpcsModule,
    AuthModule,
  ],
})
export class AppModule {}
