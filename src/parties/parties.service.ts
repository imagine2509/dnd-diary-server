import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Party } from './schemas/parties.schema';
import { CharactersService } from 'src/characters/characters.service';
import { Model, Types } from 'mongoose';
import { CreatePartyDto } from './dto/create-party-dto';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party.name)
    private readonly partyModel: Model<Party>,
    private readonly characterService: CharactersService,
  ) {}

  async getPartyById(partyId: Types.ObjectId): Promise<Party> {
    const party = await this.partyModel.findById(partyId).exec();
    if (!party) throw new NotFoundException('Party not found');
    return party;
  }

  async createParty(
    party: CreatePartyDto,
    characterId: Types.ObjectId,
  ): Promise<Party> {
    const createdParty = await this.partyModel.create(party);
    await this.characterService.updateCharacterParties(
      'add',
      characterId,
      createdParty._id,
    );
    return createdParty;
  }

  async deleteParty(
    characterId: Types.ObjectId,
    partyId: Types.ObjectId,
  ): Promise<Party> {
    const deletedParty = await this.partyModel.findByIdAndDelete(partyId);
    await this.characterService.updateCharacterParties(
      'delete',
      characterId,
      partyId,
    );
    return deletedParty;
  }

  async updatePartyPlaces(
    reason: 'add' | 'delete',
    partyId: Types.ObjectId,
    partyPlaceId: Types.ObjectId,
  ): Promise<void> {
    switch (reason) {
      case 'add':
        await this.partyModel.findByIdAndUpdate(
          partyId,
          { $push: { partyPlaces: partyPlaceId } },
          { new: true },
        );
        break;
      case 'delete':
        await this.partyModel.findByIdAndUpdate(
          partyId,
          { $pull: { partyPlaces: partyPlaceId } },
          { new: true },
        );
        break;
    }
  }

  async updatePartyMembers(
    reason: 'add' | 'delete',
    partyId: Types.ObjectId,
    partyMemberId: Types.ObjectId,
  ): Promise<void> {
    switch (reason) {
      case 'add':
        await this.partyModel.findByIdAndUpdate(
          partyId,
          { $push: { partyMembers: partyMemberId } },
          { new: true },
        );
        break;
      case 'delete':
        await this.partyModel.findByIdAndUpdate(
          partyId,
          { $pull: { partyMembers: partyMemberId } },
          { new: true },
        );
        break;
    }
  }

  async updatePartyQuests(
    reason: 'add' | 'delete',
    partyId: Types.ObjectId,
    partyQuestId: Types.ObjectId,
  ): Promise<void> {
    switch (reason) {
      case 'add':
        await this.partyModel.findByIdAndUpdate(
          partyId,
          { $push: { partyQuests: partyQuestId } },
          { new: true },
        );
        break;
      case 'delete':
        await this.partyModel.findByIdAndUpdate(
          partyId,
          { $push: { partyQuests: partyQuestId } },
          { new: false },
        );
        break;
    }
  }

  async updatePartyGames(
    reason: 'add' | 'delete',
    partyId: Types.ObjectId,
    partyGameId: Types.ObjectId,
  ): Promise<void> {
    switch (reason) {
      case 'add':
        await this.partyModel.findByIdAndUpdate(
          partyId,
          { $push: { partyGames: partyGameId } },
          { new: true },
        );
        break;
      case 'delete':
        await this.partyModel.findByIdAndUpdate(
          partyId,
          { $pull: { partyGames: partyGameId } },
          { new: true },
        );
        break;
    }
  }

  async updatePartyNpcs(
    reason: 'add' | 'delete',
    partyId: Types.ObjectId,
    partyNpcId: Types.ObjectId,
  ): Promise<void> {
    switch (reason) {
      case 'add':
        await this.partyModel.findByIdAndUpdate(
          partyId,
          { $push: { partyNpcs: partyNpcId } },
          { new: true },
        );
        break;
      case 'delete':
        await this.partyModel.findByIdAndUpdate(
          partyId,
          { $push: { partyNpcs: partyNpcId } },
          { new: true },
        );
        break;
    }
  }
}
