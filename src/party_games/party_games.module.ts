import { Module } from '@nestjs/common';
import { PartyGamesService } from './party_games.service';
import { PartyGamesController } from './party_games.controller';

@Module({
  controllers: [PartyGamesController],
  providers: [PartyGamesService],
})
export class PartyGamesModule {}
