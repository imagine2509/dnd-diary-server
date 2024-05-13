import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from './schemas/character.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user-dto';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
    private readonly usersService: UsersService,
  ) {}

  async createCharacter(
    character: Character,
    userId: string,
  ): Promise<Character> {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const createdCharacter = await this.characterModel.create(character);
    const newCharacterIds = Array.isArray(user.characterIds)
      ? [...user.characterIds, createdCharacter._id]
      : [createdCharacter._id];
    const updateUserDto: UpdateUserDto = {
      characterIds: newCharacterIds,
    };
    await this.usersService.updateUser(userId, updateUserDto);
    return createdCharacter;
  }

  async findAllUserCharacters(userId: string): Promise<Character[]> {
    const user = await this.usersService.findUserById(userId);
    const characters = await this.characterModel.find({
      _id: { $in: user.characterIds },
    });
    return characters;
  }

  async deleteCharacter(characterId: string): Promise<Character> {
    const deletedCharacter =
      await this.characterModel.findByIdAndDelete(characterId);
    return deletedCharacter;
  }

  async changeCharacterLevel(
    characterId: string,
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
}
