import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PartyGame } from './schemas/party-games-schema';
import { Model, Types } from 'mongoose';
import { PartiesService } from 'src/parties/parties.service';
import { CreatePartyGameDto } from './dto/create-party-game-dto';
import { UpdatePartyGameDto } from './dto/update-party-game-dto';

@Injectable()
export class PartyGamesService {
  constructor(
    @InjectModel(PartyGame.name)
    private readonly partyGameModel: Model<PartyGame>,
    private readonly partiesService: PartiesService,
  ) {}

  async getPartyGameById(partyGameId: Types.ObjectId): Promise<PartyGame> {
    const partyGame = await this.partyGameModel.findById(partyGameId).exec();
    if (!partyGame)
      throw new NotFoundException(
        `Party game with ID "${partyGameId}" not found.`,
      );
    return partyGame;
  }

  async createPartyGame(
    partyGame: CreatePartyGameDto,
    partyId: Types.ObjectId,
  ): Promise<PartyGame> {
    const createdPartyGame = await this.partyGameModel.create(partyGame);
    await this.partiesService.updatePartyGames(
      'add',
      partyId,
      createdPartyGame._id,
    );
    return createdPartyGame;
  }

  async deletePartyGame(
    partyId: Types.ObjectId,
    partyGameId: Types.ObjectId,
  ): Promise<PartyGame> {
    const deletedPartyGame =
      await this.partyGameModel.findByIdAndDelete(partyGameId);
    if (!deletedPartyGame)
      throw new NotFoundException(
        `Party place with ID "${partyGameId}" not found.`,
      );
    await this.partiesService.updatePartyGames(
      'delete',
      partyId,
      deletedPartyGame._id,
    );
    return deletedPartyGame;
  }

  async updatePartyGame(
    partyGameId: Types.ObjectId,
    partyGame: UpdatePartyGameDto,
  ): Promise<PartyGame> {
    const updatedPartyGame = await this.partyGameModel.findByIdAndUpdate(
      partyGameId,
      partyGame,
      { new: true },
    );
    if (!updatedPartyGame)
      throw new NotFoundException(
        `Party place with ID "${partyGameId}" not found.`,
      );
    return updatedPartyGame;
  }
}
