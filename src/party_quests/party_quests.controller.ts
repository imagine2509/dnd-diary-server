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
import { PartyQuestsService } from './party_quests.service';
import { Types } from 'mongoose';
import { CreatePartyQuestDto } from './dto/create-party-quest-dto';
import { UpdatePartyQuestDto } from './dto/update-party-quest-dto';

@Controller('party-quests')
export class PartyQuestsController {
  constructor(private readonly partyQuestsService: PartyQuestsService) {}

  @Get(':partyQuestId')
  getPartyQuestById(@Param('partyQuestId') partyQuestId: Types.ObjectId) {
    return this.partyQuestsService.getPartyQuestById(partyQuestId);
  }

  @Post(':partyId')
  @UsePipes(new ValidationPipe())
  createPartyQuest(
    @Param('partyId') partyId: Types.ObjectId,
    @Body() data: CreatePartyQuestDto,
  ) {
    return this.partyQuestsService.createPartyQuest(data, partyId);
  }

  @Delete(':partyQuestsId')
  deletePartyQuest(
    @Param('partyId') partyId: Types.ObjectId,
    @Body() partyQuestId: Types.ObjectId,
  ) {
    return this.partyQuestsService.deletePartyQuest(partyId, partyQuestId);
  }

  @Patch(':partyQuestId')
  updatePartyQuest(
    @Param('partyQuestId') partyQuestId: Types.ObjectId,
    @Body() data: UpdatePartyQuestDto,
  ) {
    return this.partyQuestsService.updatePartyQuest(partyQuestId, data);
  }
}
