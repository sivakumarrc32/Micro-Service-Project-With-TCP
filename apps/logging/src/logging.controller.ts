/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LOGGING_PATTERN } from '@app/contracts/logging/logging.pattern';
import { CreateUserDto } from '@app/contracts/logging/create-user.dto';

@Controller()
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @MessagePattern(LOGGING_PATTERN.SIGNUP)
  /**
   * This function used to create a new user in the logging microservice.
   * @param data The data is received from the logging service gateway and data to be sent to the logging service of the logging application
   * @returns The result of the signup operation
   * @throws {Error} If something went wrong
   */
  signup(@Payload() data: CreateUserDto) {
    try {
      console.log('data in controller', data);
      return this.loggingService.signup(data);
    } catch (e: any) {
      if (e instanceof Error) {
        return {
          message: e.message,
        };
      }
      return {
        message: e.message,
      };
    }
  }

  @MessagePattern(LOGGING_PATTERN.LOGIN)
  /**
   * This function used to login a user in the logging microservice.
   * @param data The data is received from the logging service gateway and data to be sent to the logging service of the logging application
   * @returns The result of the login operation
   * @throws {Error} If something went wrong
   */
  login(@Payload() data: CreateUserDto) {
    console.log('data', data);
    try {
      console.log('data in controller', data);
      return this.loggingService.login(data);
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
