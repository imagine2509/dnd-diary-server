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
import { PartyMembersService } from './party_members.service';
import { Types } from 'mongoose';
import { CreatePartyMemberDto } from './dto/create-party-member-dto';
import { UpdatePartyMemberDto } from './dto/update-party-member-dto';

@Controller('party-members')
export class PartyMembersController {
  constructor(private readonly partyMembersService: PartyMembersService) {}

  @Get(':partyMemberId')
  getPartyMemberById(@Param('partyMemberId') partyMemberId: Types.ObjectId) {
    return this.partyMembersService.getPartyMemberById(partyMemberId);
  }

  @Post(':partyId')
  @UsePipes(new ValidationPipe())
  createPartyMember(
    @Param('partyId') partyId: Types.ObjectId,
    @Body() data: CreatePartyMemberDto,
  ) {
    return this.partyMembersService.createPartyMember(data, partyId);
  }

  @Delete(':partyMemberId')
  delete(@Param('partyMemberId') partyMemberId: Types.ObjectId) {
    return this.partyMembersService.deletePartyMember(partyMemberId);
  }

  @Patch(':partyMemberId')
  editPartyMemberNotes(
    @Param('partyMemberId') partyMemberId: Types.ObjectId,
    @Body() data: UpdatePartyMemberDto,
  ) {
    return this.partyMembersService.editPartyMemberNotes(partyMemberId, data);
  }
}
