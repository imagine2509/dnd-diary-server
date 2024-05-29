import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PartyGamesService } from './party_games.service';
import { Types } from 'mongoose';
import { CreatePartyGameDto } from './dto/create-party-game-dto';
import { UpdatePartyGameDto } from './dto/update-party-game-dto';

@Controller('party-games')
export class PartyGamesController {
  constructor(private readonly partyGamesService: PartyGamesService) {}

  @Get(':partyGameId')
  getPartyGameById(@Param('partyGameId') partyGameId: Types.ObjectId) {
    return this.partyGamesService.getPartyGameById(partyGameId);
  }

  @Post(':partyId')
  @UsePipes(new ValidationPipe())
  createPartyGame(
    @Param('partyId') partyId: Types.ObjectId,
    @Body() data: CreatePartyGameDto,
  ) {
    return this.partyGamesService.createPartyGame(data, partyId);
  }

  @Delete(':partyId/:partyGameId')
  deletePartyGame(
    @Param('partyId') partyId: Types.ObjectId,
    @Body() partyGameId: Types.ObjectId,
  ) {
    return this.partyGamesService.deletePartyGame(partyId, partyGameId);
  }

  @Patch(':partyId')
  updatePartyGame(
    @Param('partyId') partyId: Types.ObjectId,
    @Body() data: UpdatePartyGameDto,
  ) {
    return this.partyGamesService.updatePartyGame(partyId, data);
  }
}
