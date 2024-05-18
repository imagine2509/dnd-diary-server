import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PartiesService } from './parties.service';
import { Types } from 'mongoose';
import { CreatePartyDto } from './dto/create-party-dto';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Get(':partyId')
  getPartyById(@Param('partyId') partyId: Types.ObjectId) {
    return this.partiesService.getPartyById(partyId);
  }

  @Post(':characterId')
  @UsePipes(new ValidationPipe())
  create(
    @Param('characterId') characterId: string,
    @Body() data: CreatePartyDto,
  ) {
    return this.partiesService.createParty(data, characterId);
  }

  @Delete(':partyId')
  delete(@Param('partyId') partyId: Types.ObjectId) {
    return this.partiesService.deleteParty(partyId);
  }
}
