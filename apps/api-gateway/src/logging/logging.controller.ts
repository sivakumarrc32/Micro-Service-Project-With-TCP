/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { LoggingService } from './logging.service';
import { CreateUserDto } from '@app/contracts/logging/create-user.dto';
import { lastValueFrom } from 'rxjs';

@Controller('logging')
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Post('signup')
  /**
   * Signup a user
   * @body data The user data to be sent to the logging service
   * @returns The result of the signup operation
   * @throws Error if something went wrong
   */
  async signup(@Body() data: CreateUserDto) {
    try {
      const result = await lastValueFrom(this.loggingService.signup(data));
      return result;
    } catch (e: any) {
      if (e.status === 400) {
        throw new BadRequestException(e.message);
      }
    }
  }

  @Post('login')
  /**
   * Login a user
   * @body data The user data to be sent to the logging service
   * @returns The result of the login operation
   * @throws Error if something went wrong
   */
  async login(@Body() data: CreateUserDto) {
    try {
      const result = await lastValueFrom(this.loggingService.login(data));
      return result;
    } catch (e: any) {
      if (e.status === 400) {
        throw new BadRequestException(e.message);
      }
      if (e.status === 404) {
        throw new NotFoundException(e.message);
      }
      if (e.status === 409) {
        throw new ConflictException(e.message);
      }
    }
  }
}
