import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from './schemas/character.schema';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
    private readonly usersService: UsersService,
  ) {}

  async getCharacterById(id: Types.ObjectId): Promise<Character> {
    const character = await this.characterModel.findById(id).exec();
    if (!character)
      throw new NotFoundException(`Character with ID "${id}" not found.`);
    return character;
  }

  async createCharacter(
    character: Character,
    userId: Types.ObjectId,
  ): Promise<Character> {
    const createdCharacter = await this.characterModel.create(character);
    await this.usersService.updateUserCharactersIds(
      'add',
      userId,
      createdCharacter._id,
    );
    return createdCharacter;
  }

  async findAllUserCharacters(userId: Types.ObjectId): Promise<Character[]> {
    const user = await this.usersService.findUserById(userId);
    const characters = await this.characterModel.find({
      _id: { $in: user.characterIds },
    });
    return characters;
  }

  async deleteCharacter(
    userId: Types.ObjectId,
    characterId: Types.ObjectId,
  ): Promise<Character> {
    const deletedCharacter =
      await this.characterModel.findByIdAndDelete(characterId);
    if (!deletedCharacter)
      throw new NotFoundException(
        `Party quest with ID "${characterId}" not found.`,
      );
    await this.usersService.updateUserCharactersIds(
      'delete',
      userId,
      characterId,
    );
    return deletedCharacter;
  }

  async changeCharacterLevel(
    characterId: Types.ObjectId,
    data: { reason: 'levelUp' | 'levelDown' | 'edit'; newLevel?: number },
  ): Promise<Character> {
    const editedCharacter = await this.characterModel.findById(characterId);
    switch (data.reason) {
      case 'levelUp':
        editedCharacter.level++;
        break;
      case 'levelDown':
        editedCharacter.level--;
        break;
      case 'edit':
        editedCharacter.level = data.newLevel;
        break;
    }
    const updatedCharacter = await this.characterModel.findByIdAndUpdate(
      characterId,
      editedCharacter,
    );
    return updatedCharacter;
  }

  async updateCharacterParties(
    reason: 'add' | 'delete',
    characterId: Types.ObjectId,
    partyId: Types.ObjectId,
  ): Promise<Character> {
    const editableCharacter = await this.getCharacterById(characterId);
    switch (reason) {
      case 'add':
        this.characterModel.findByIdAndUpdate(
          characterId,
          { $push: { partyIds: partyId } },
          { new: true },
        );
        break;
      case 'delete':
        this.characterModel.findByIdAndUpdate(
          characterId,
          { $push: { partyId } },
          { new: true },
        );
        break;
    }
    return editableCharacter;
  }
}
