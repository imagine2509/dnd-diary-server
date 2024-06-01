import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PartyMember } from './schemas/party_member_scheme';
import { Model, Types } from 'mongoose';
import { PartiesService } from 'src/parties/parties.service';
import { UpdatePartyMemberDto } from './dto/update-party-member-dto';
import { CreatePartyMemberDto } from './dto/create-party-member-dto';

@Injectable()
export class PartyMembersService {
  constructor(
    @InjectModel(PartyMember.name)
    private readonly partyMemberModel: Model<PartyMember>,
    private readonly partiesService: PartiesService,
  ) {}

  async getPartyMemberById(
    partyMemberId: Types.ObjectId,
  ): Promise<PartyMember> {
    const partyMember = await this.partyMemberModel
      .findById(partyMemberId)
      .exec();
    if (!partyMember)
      throw new NotFoundException(
        `Party member with ID "${partyMemberId}" not found.`,
      );
    return partyMember;
  }

  async createPartyMember(
    partyMember: CreatePartyMemberDto,
    partyId: Types.ObjectId,
  ): Promise<PartyMember> {
    const createdPartyMember = await this.partyMemberModel.create(partyMember);
    this.partiesService.updatePartyMembers(
      'add',
      partyId,
      createdPartyMember._id,
    );
    return createdPartyMember;
  }

  async deletePartyMember(
    partyId: Types.ObjectId,
    partyMemberId: Types.ObjectId,
  ): Promise<PartyMember> {
    const deletedPartyMember =
      await this.partyMemberModel.findByIdAndDelete(partyMemberId);
    if (!deletedPartyMember)
      throw new NotFoundException(
        `Party place with ID "${partyMemberId}" not found.`,
      );
    await this.partiesService.updatePartyMembers(
      'delete',
      partyId,
      partyMemberId,
    );
    return deletedPartyMember;
  }

  async editPartyMemberNotes(
    partyMemberId: Types.ObjectId,
    data: UpdatePartyMemberDto,
  ): Promise<PartyMember> {
    const editedPartyMember =
      await this.partyMemberModel.findById(partyMemberId);
    if (!editedPartyMember)
      throw new NotFoundException(
        `Party place with ID "${partyMemberId}" not found.`,
      );
    editedPartyMember.notes = data.notes;
    await editedPartyMember.save();
    return editedPartyMember;
  }
}
