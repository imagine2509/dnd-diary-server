import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PartyPlace } from './schemas/party-place-schema';
import { PartiesService } from 'src/parties/parties.service';
import { Model, Types } from 'mongoose';
import { CreatePartyPlaceDto } from './dto/create-party-place-dto';
import { UpdatePartyDto } from 'src/parties/dto/update-party-dto';

@Injectable()
export class PartyPlaceService {
  constructor(
    @InjectModel(PartyPlace.name)
    private readonly partyPlaceModel: Model<PartyPlace>,
    private readonly partiesService: PartiesService,
  ) {}

  async getPartyPlaceById(partyPlaceId: Types.ObjectId): Promise<PartyPlace> {
    const partyPlace = await this.partyPlaceModel.findById(partyPlaceId).exec();
    if (!partyPlace)
      throw new NotFoundException(
        `Party place with ID "${partyPlaceId}" not found.`,
      );
    return partyPlace;
  }

  async createPartyPlace(
    partyPlace: CreatePartyPlaceDto,
    partyId: Types.ObjectId,
  ): Promise<PartyPlace> {
    const createdPartyPlace = await this.partyPlaceModel.create(partyPlace);
    this.partiesService.updatePartyPlaces(
      'add',
      partyId,
      createdPartyPlace._id,
    );
    return createdPartyPlace;
  }

  async deletePartyPlace(partyPlaceId: Types.ObjectId): Promise<PartyPlace> {
    const deletedPartyPlace =
      await this.partyPlaceModel.findByIdAndDelete(partyPlaceId);
    if (!deletedPartyPlace)
      throw new NotFoundException(
        `Party place with ID "${partyPlaceId}" not found.`,
      );
    return deletedPartyPlace;
  }

  async editPartyPlaceDescription(
    partyPlaceId: Types.ObjectId,
    data: UpdatePartyDto,
  ): Promise<PartyPlace> {
    const updatedPartyPlace = this.partyPlaceModel.findByIdAndUpdate(
      partyPlaceId,
      data,
      { new: true },
    );
    if (!updatedPartyPlace) throw new NotFoundException('PartyPlace not found');
    return updatedPartyPlace;
  }
}
