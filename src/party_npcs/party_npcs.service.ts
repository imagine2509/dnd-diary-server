import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PartiesService } from 'src/parties/parties.service';
import { PartyNpc } from './schemas/party-npc-schema';
import { Model, Types } from 'mongoose';
import { CreatePartyNpcDto } from './dto/create-party-npc-dto';
import { UpdatePartyNpcDto } from './dto/update-party-npc-dto';

@Injectable()
export class PartyNpcsService {
  constructor(
    @InjectModel(PartyNpc.name)
    private readonly partyNpcModel: Model<PartyNpc>,
    private readonly partiesService: PartiesService,
  ) {}

  async getPartyNpcById(partyNpcId: Types.ObjectId): Promise<PartyNpc> {
    const partyNpc = await this.partyNpcModel.findById(partyNpcId).exec();
    if (!partyNpc)
      throw new NotFoundException(
        `Party npc with ID "${partyNpcId}" not found.`,
      );
    return partyNpc;
  }

  async createPartyNpc(
    partyNpc: CreatePartyNpcDto,
    partyId: Types.ObjectId,
  ): Promise<PartyNpc> {
    const createdPartyNpc = await this.partyNpcModel.create(partyNpc);
    await this.partiesService.updatePartyNpcs(
      'add',
      partyId,
      createdPartyNpc._id,
    );
    return createdPartyNpc;
  }

  async deletePartyNpc(
    partyId: Types.ObjectId,
    partyNpcId: Types.ObjectId,
  ): Promise<PartyNpc> {
    const deletedPartyNpc =
      await this.partyNpcModel.findByIdAndDelete(partyNpcId);
    await this.partiesService.updatePartyNpcs(
      'delete',
      partyId,
      deletedPartyNpc._id,
    );
    return deletedPartyNpc;
  }

  async updatePartyNpc(
    partyNpcId: Types.ObjectId,
    partyNpc: UpdatePartyNpcDto,
  ): Promise<PartyNpc> {
    const updatedPartyNpc = await this.partyNpcModel.findByIdAndUpdate(
      partyNpcId,
      partyNpc,
      { new: true },
    );
    if (!updatedPartyNpc)
      throw new NotFoundException(
        `Party npc with ID "${partyNpcId}" not found.`,
      );
    return updatedPartyNpc;
  }
}
