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
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character-dto';
import { Types } from 'mongoose';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post(':userId')
  @UsePipes(new ValidationPipe())
  create(
    @Param('userId') userId: Types.ObjectId,
    @Body() data: CreateCharacterDto,
  ) {
    return this.charactersService.createCharacter(data, userId);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: Types.ObjectId) {
    return this.charactersService.findAllUserCharacters(userId);
  }

  @Delete(':userId')
  delete(
    @Param('userId') userId: Types.ObjectId,
    @Body() characterId: Types.ObjectId,
  ) {
    return this.charactersService.deleteCharacter(userId, characterId);
  }

  @Patch(':characterId')
  changeLevel(
    @Param('characterId') characterId: Types.ObjectId,
    @Body()
    data: { reason: 'levelUp' | 'levelDown' | 'edit'; newLevel?: number },
  ) {
    return this.charactersService.changeCharacterLevel(characterId, data);
  }

  @Patch(':characterId/parties')
  updateCharacterParties(
    @Param('characterId') characterId: Types.ObjectId,
    @Body()
    data: { reason: 'add' | 'delete'; partyId: Types.ObjectId },
  ) {
    return this.charactersService.updateCharacterParties(
      data.reason,
      characterId,
      data.partyId,
    );
  }
}
