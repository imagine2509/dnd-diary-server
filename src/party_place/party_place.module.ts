import { Module } from '@nestjs/common';
import { PartyPlaceService } from './party_place.service';
import { PartyPlaceController } from './party_place.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartyPlace, PartyPlaceSchema } from './schemas/party-place-schema';
import { PartiesModule } from 'src/parties/parties.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PartyPlace.name, schema: PartyPlaceSchema },
    ]),
    PartiesModule,
  ],
  controllers: [PartyPlaceController],
  providers: [PartyPlaceService],
})
export class PartyPlaceModule {}
