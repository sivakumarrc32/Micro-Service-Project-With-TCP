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
      const serviceStart = process.hrtime.bigint();
      const result = this.usersService.getProfile(userId);
      const serviceEnd = process.hrtime.bigint();
      console.log(
        `
        [MICROSERVICE] Request for signup received at ${Number(serviceStart) / 1_000_000} ms
        [MICROSERVICE] Processing time: ${(Number(serviceEnd - serviceStart) / 1_000_000).toFixed(3)} ms`,
      );
      return result;
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
      const serviceStart = process.hrtime.bigint();
      const result = this.usersService.updateProfile(userId, data);
      const serviceEnd = process.hrtime.bigint();
      console.log(
        `
        [MICROSERVICE] Request for signup received at ${Number(serviceStart) / 1_000_000} ms
        [MICROSERVICE] Processing time: ${(Number(serviceEnd - serviceStart) / 1_000_000).toFixed(3)} ms`,
      );
      return result;
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
