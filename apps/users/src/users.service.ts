import { UpdateUserDto } from '@app/contracts/users/update-user.dto';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'apps/logging/src/logging.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private Users: Model<User>) {}

  /**
   * Gets a user's profile.
   * @param userId The id of the user to fetch the profile for user.
   * @returns The user's profile.
   * @throws {RpcException} If the user is not found
   */
  async getProfile(userId: string) {
    console.log('userId in service', userId);
    const user = await this.Users.findOne({ _id: userId }).select(
      '-password -__v -createdAt -updatedAt',
    );
    if (!user) {
      throw new RpcException({
        status: 404,
        message: 'User not found',
      });
    }
    return {
      status: 200,
      message: 'User profile fetched successfully',
      user,
    };
  }

  /**
   * Updates a user's profile.
   * @param userId The id of the user to update the profile for user.
   * @param data The data to be updated.
   * @returns The updated user's profile.
   * @throws {RpcException} If the user is not found
   */
  async updateProfile(userId: string, data: UpdateUserDto) {
    const user = await this.Users.findOne({ _id: userId });
    if (!user) {
      throw new RpcException({
        status: 404,
        message: 'User not found',
      });
    }
    const updates = {};
    const allowedFields = ['name', 'age'];
    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updates[key] = data[key];
      }
    }
    const updatedUser = await this.Users.findOneAndUpdate(
      { _id: userId },
      { $set: updates },
      { new: true },
    );
    return {
      status: 200,
      message: 'User profile updated successfully',
      updatedUser,
    };
  }
}
