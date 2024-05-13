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

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post(':userId')
  @UsePipes(new ValidationPipe())
  create(@Param('userId') userId: string, @Body() data: CreateCharacterDto) {
    return this.charactersService.createCharacter(data, userId);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.charactersService.findAllUserCharacters(userId);
  }

  @Delete(':characterId')
  delete(@Param('characterId') characterId: string) {
    return this.charactersService.deleteCharacter(characterId);
  }

  @Patch(':characterId')
  changeLevel(
    @Param('characterId') characterId: string,
    @Body()
    data: { reason: 'levelUp' | 'levelDown' | 'edit'; newLevel?: number },
  ) {
    return this.charactersService.changeCharacterLevel(characterId, data);
  }
}
