import { Module } from '@nestjs/common';
import { PartyNpcsService } from './party_npcs.service';
import { PartyNpcsController } from './party_npcs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartyNpc, PartyNpcSchema } from './schemas/party-npc-schema';
import { PartiesModule } from 'src/parties/parties.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PartyNpc.name, schema: PartyNpcSchema },
    ]),
    PartiesModule,
  ],
  controllers: [PartyNpcsController],
  providers: [PartyNpcsService],
})
export class PartyNpcsModule {}
