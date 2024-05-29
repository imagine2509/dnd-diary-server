import { Module } from '@nestjs/common';
import { PartyGamesService } from './party_games.service';
import { PartyGamesController } from './party_games.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartyGame, PartyGameSchema } from './schemas/party-games-schema';
import { PartiesModule } from 'src/parties/parties.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PartyGame.name, schema: PartyGameSchema },
    ]),
    PartiesModule,
  ],
  controllers: [PartyGamesController],
  providers: [PartyGamesService],
})
export class PartyGamesModule {}
