import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PartyPlaceService } from './party_place.service';
import { Types } from 'mongoose';
import { CreatePartyPlaceDto } from './dto/create-party-place-dto';
import { UpdatePartyDto } from 'src/parties/dto/update-party-dto';

@Controller('party-place')
export class PartyPlaceController {
  constructor(private readonly partyPlaceService: PartyPlaceService) {}

  @Get(':partyPlaceId')
  getPartyPlaceById(@Param('id') partyPlaceId: Types.ObjectId) {
    return this.partyPlaceService.getPartyPlaceById(partyPlaceId);
  }

  @Post(':partyId')
  @UsePipes(new ValidationPipe())
  createPartyPlace(
    @Param('partyId') partyId: Types.ObjectId,
    @Body() data: CreatePartyPlaceDto,
  ) {
    return this.partyPlaceService.createPartyPlace(data, partyId);
  }

  @Patch(':partyPlaceId')
  editPartyPlaceDescription(
    @Param('partyPlaceId') partyPlaceId: Types.ObjectId,
    @Body() data: UpdatePartyDto,
  ) {
    return this.partyPlaceService.editPartyPlaceDescription(partyPlaceId, data);
  }
}
