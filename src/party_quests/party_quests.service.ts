import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PartyQuest } from './schemas/party-quest-schema';
import { Model, Types } from 'mongoose';
import { PartiesService } from 'src/parties/parties.service';
import { CreatePartyQuestDto } from './dto/create-party-quest-dto';
import { UpdatePartyQuestDto } from './dto/update-party-quest-dto';

@Injectable()
export class PartyQuestsService {
  constructor(
    @InjectModel(PartyQuest.name)
    private readonly partyQuestModel: Model<PartyQuest>,
    private readonly partiesService: PartiesService,
  ) {}

  async getPartyQuestById(partyQuestId: Types.ObjectId): Promise<PartyQuest> {
    const partyQuest = await this.partyQuestModel.findById(partyQuestId).exec();
    if (!partyQuest)
      throw new NotFoundException(
        `Party quest with ID "${partyQuestId}" not found.`,
      );
    return partyQuest;
  }

  async createPartyQuest(
    partyQuest: CreatePartyQuestDto,
    partyId: Types.ObjectId,
  ): Promise<PartyQuest> {
    const createdPartyQuest = await this.partyQuestModel.create(partyQuest);
    this.partiesService.updatePartyQuests(
      'add',
      partyId,
      createdPartyQuest._id,
    );
    return createdPartyQuest;
  }

  async deletePartyQuest(
    partyQuestId: Types.ObjectId,
    partyId: Types.ObjectId,
  ): Promise<PartyQuest> {
    const deletedPartyQuest =
      await this.partyQuestModel.findByIdAndDelete(partyQuestId);
    await this.partiesService.updatePartyQuests(
      'delete',
      partyId,
      deletedPartyQuest.id,
    );
    return deletedPartyQuest;
  }

  async updatePartyQuest(
    partyQuestId: Types.ObjectId,
    partyQuest: UpdatePartyQuestDto,
  ): Promise<PartyQuest> {
    const updatedPartyQuest = await this.partyQuestModel.findByIdAndUpdate(
      partyQuestId,
      partyQuest,
      { new: true },
    );
    return updatedPartyQuest;
  }
}
