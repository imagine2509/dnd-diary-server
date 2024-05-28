import { Controller } from '@nestjs/common';
import { PartyGamesService } from './party_games.service';

@Controller('party-games')
export class PartyGamesController {
  constructor(private readonly partyGamesService: PartyGamesService) {}
}
