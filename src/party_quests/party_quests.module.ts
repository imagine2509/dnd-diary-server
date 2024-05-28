import { Module } from '@nestjs/common';
import { PartyQuestsService } from './party_quests.service';
import { PartyQuestsController } from './party_quests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartyQuest, PartyQuestSchema } from './schemas/party-quest-schema';
import { PartiesModule } from 'src/parties/parties.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PartyQuest.name, schema: PartyQuestSchema },
    ]),
    PartiesModule,
  ],
  controllers: [PartyQuestsController],
  providers: [PartyQuestsService],
})
export class PartyQuestsModule {}
