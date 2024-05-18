import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Party, PartySchema } from './schemas/parties.schema';
import { CharactersModule } from 'src/characters/characters.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
    CharactersModule,
  ],
  controllers: [PartiesController],
  providers: [PartiesService],
})
export class PartiesModule {}
