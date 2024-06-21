import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './schemas/users.schema';
import { Types, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findUserById(userId: Types.ObjectId): Promise<UserDocument | null> {
    const user = await this.userModel.findById(userId).exec();
    // if (!user)
    //   throw new NotFoundException(`User with ID "${userId}" not found.`);
    return user;
  }

  async findUserByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      })
      .exec();

    // if (!user)
    //   throw new NotFoundException(
    //     `User with username or email "${usernameOrEmail}" not found.`,
    //   );
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(data);
    return createdUser;
  }

  async updateUser(userId: Types.ObjectId, data: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, data, {
      new: true,
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    }
    return updatedUser;
  }

  async deleteUser(userId: Types.ObjectId): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser)
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    return deletedUser;
  }

  async updateUserCharactersIds(
    reason: 'add' | 'delete',
    userId: Types.ObjectId,
    characterId: Types.ObjectId,
  ): Promise<User> {
    if (reason === 'add') {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        { $push: { characterIds: characterId } },
        { new: true },
      );

      if (!updatedUser) {
        throw new NotFoundException(`User with ID "${userId}" not found.`);
      }
      return updatedUser;
    } else {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        { $pull: { characterIds: characterId } },
        { new: true },
      );
      if (!updatedUser) {
        throw new NotFoundException(`User with ID "${userId}" not found.`);
      }
      return updatedUser;
    }
  }
}
