import { UpdateUserDto } from '@app/contracts/users/update-user.dto';
import { USERS_PATTERN } from '@app/contracts/users/users.pattern';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICE_CLIENT } from '../constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MICROSERVICE_CLIENT.USER) private userClient: ClientProxy,
  ) {}

  /**
   * Sends a message to the users microservice to fetch a user's profile.
   * @param userId The id of the user to fetch the profile for user.
   * @returns The response from the users microservice.
   */
  getProfile(userId: string) {
    return this.userClient.send(USERS_PATTERN.GET_PROFILE, userId);
  }

  /**
   * Sends a message to the users microservice to update a user's profile.
   * @param data The data to be updated.
   * @param userId The id of the user to update the profile for user.
   * @returns The response from the users microservice.
   */
  updateProfile(data: UpdateUserDto, userId: string) {
    return this.userClient.send(USERS_PATTERN.UPDATE_PROFILE, { data, userId });
  }
}
