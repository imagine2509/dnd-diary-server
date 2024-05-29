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
import { PartyNpcsService } from './party_npcs.service';
import { Types } from 'mongoose';
import { CreatePartyNpcDto } from './dto/create-party-npc-dto';
import { UpdatePartyNpcDto } from './dto/update-party-npc-dto';

@Controller('party-npcs')
export class PartyNpcsController {
  constructor(private readonly partyNpcsService: PartyNpcsService) {}

  @Get(':partyNpcId')
  getPartyNpcById(@Param('partyNpcId') partyNpcId: Types.ObjectId) {
    return this.partyNpcsService.getPartyNpcById(partyNpcId);
  }

  @Post(':partyId')
  @UsePipes(new ValidationPipe())
  createPartyNpc(
    @Param('partyId') partyId: Types.ObjectId,
    @Body() data: CreatePartyNpcDto,
  ) {
    return this.partyNpcsService.createPartyNpc(data, partyId);
  }

  @Delete(':partyNpcId')
  deletePartyNpc(
    @Param('partyId') partyId: Types.ObjectId,
    @Param('partyNpcId') partyNpcId: Types.ObjectId,
  ) {
    return this.partyNpcsService.deletePartyNpc(partyId, partyNpcId);
  }

  @Patch(':partyId')
  updatePartyNpc(
    @Param('partyId') partyId: Types.ObjectId,
    @Body() data: UpdatePartyNpcDto,
  ) {
    return this.partyNpcsService.updatePartyNpc(partyId, data);
  }
}
