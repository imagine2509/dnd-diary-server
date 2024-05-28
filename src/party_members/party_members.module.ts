import { Module } from '@nestjs/common';
import { PartyMembersService } from './party_members.service';
import { PartyMembersController } from './party_members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartyMember, PartyMemberSchema } from './schemas/party_member_scheme';
import { PartiesModule } from 'src/parties/parties.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PartyMember.name, schema: PartyMemberSchema },
    ]),
    PartiesModule,
  ],
  controllers: [PartyMembersController],
  providers: [PartyMembersService],
})
export class PartyMembersModule {}
