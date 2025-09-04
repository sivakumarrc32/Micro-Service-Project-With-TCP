import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USERS_PATTERN } from '@app/contracts/users/users.pattern';
import { UpdateUserDto } from '@app/contracts/users/update-user.dto';
// import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERN.GET_PROFILE)
  /**
   * Get a user's profile.
   * @param userId The id of the user to fetch the profile for user.
   * @returns The user's profile.
   * @throws {NotFoundException} If the user is not found
   * @throws {Error} If something else goes wrong
   */
  getProfile(@Payload() userId: string) {
    try {
      console.log('userId', userId);
      return this.usersService.getProfile(userId);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return {
          message: e.message,
        };
      }
      return {
        message: 'Something went wrong',
      };
    }
  }

  @MessagePattern(USERS_PATTERN.UPDATE_PROFILE)
  /**
   * Update a user's profile.
   * @param payload The data to be updated and the id of the user to update the profile for user.
   * @returns The updated user's profile.
   * @throws {NotFoundException} If the user is not found
   * @throws {Error} If something else goes wrong
   */
  updateProfile(@Payload() payload: { data: UpdateUserDto; userId: string }) {
    const { data, userId } = payload;
    try {
      return this.usersService.updateProfile(userId, data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return {
          message: e.message,
        };
      }
      return {
        message: 'Something went wrong',
      };
    }
  }
}
