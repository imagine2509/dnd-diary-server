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
    characterId: string,
  ): Promise<Party> {
    const createdParty = await this.partyModel.create(party);
    this.characterService.updateCharacterParties(
      'add',
      characterId,
      createdParty._id,
    );
    return createdParty;
  }

  async deleteParty(partyId: Types.ObjectId): Promise<Party> {
    const deletedParty = await this.partyModel.findByIdAndDelete(partyId);
    return deletedParty;
  }

  async updatePartyPlaces(
    reason: 'add' | 'delete',
    partyId: Types.ObjectId,
    partyPlaceId: Types.ObjectId,
  ) {
    const editableParty = await this.getPartyById(partyId);
    switch (reason) {
      case 'add':
        editableParty.partyPlaces.push(partyPlaceId);
        break;
      case 'delete':
        editableParty.partyPlaces.splice(
          editableParty.partyPlaces.indexOf(partyPlaceId),
          1,
        );
        break;
    }
  }

  async updatePartyMembers(
    reason: 'add' | 'delete',
    partyId: Types.ObjectId,
    partyMemberId: Types.ObjectId,
  ) {
    const editableParty = await this.getPartyById(partyId);
    switch (reason) {
      case 'add':
        editableParty.partyMembers.push(partyMemberId);
        break;
      case 'delete':
        editableParty.partyMembers.splice(
          editableParty.partyMembers.indexOf(partyMemberId),
          1,
        );
        break;
    }
  }

  async updatePartyQuests(
    reason: 'add' | 'delete',
    partyId: Types.ObjectId,
    partyQuestId: Types.ObjectId,
  ) {
    const editableParty = await this.getPartyById(partyId);
    switch (reason) {
      case 'add':
        editableParty.quests.push(partyQuestId);
        break;
      case 'delete':
        editableParty.quests.splice(
          editableParty.quests.indexOf(partyQuestId),
          1,
        );
        break;
    }
  }

  async updatePartyGames(
    reason: 'add' | 'delete',
    partyId: Types.ObjectId,
    partyGameId: Types.ObjectId,
  ) {
    const editableParty = await this.getPartyById(partyId);
    switch (reason) {
      case 'add':
        editableParty.games.push(partyGameId);
        break;
      case 'delete':
        editableParty.games.splice(editableParty.games.indexOf(partyGameId), 1);
        break;
    }
  }
}
