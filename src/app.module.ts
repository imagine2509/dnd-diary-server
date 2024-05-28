import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { PartiesModule } from './parties/parties.module';
import { PartyPlaceModule } from './party_place/party_place.module';
import { PartyMembersModule } from './party_members/party_members.module';
import { PartyGamesModule } from './party_games/party_games.module';
import { PartyQuestsModule } from './party_quests/party_quests.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/dnd-diary-database'),
    UsersModule,
    CharactersModule,
    PartiesModule,
    PartyPlaceModule,
    PartyMembersModule,
    PartyGamesModule,
    PartyQuestsModule,
  ],
})
export class AppModule {}
