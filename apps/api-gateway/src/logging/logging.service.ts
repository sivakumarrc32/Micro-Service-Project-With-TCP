import { CreateUserDto } from '@app/contracts/logging/create-user.dto';
import { LOGGING_PATTERN } from '@app/contracts/logging/logging.pattern';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICE_CLIENT } from '../constants';

@Injectable()
export class LoggingService {
  constructor(
    @Inject(MICROSERVICE_CLIENT.LOGGING) private loggingClient: ClientProxy,
  ) {}

  /**
   * This function used to send the data to the logging application through tcp protocol to create a user
   * LOGGING_PATTERN.SIGNUP is the pattern to be used to send the data
   * @param data data is received from the logging controller and the data to be sent to the logging application through the payload to be sent
   */
  signup(data: CreateUserDto) {
    console.log('data in service', data);
    return this.loggingClient.send(LOGGING_PATTERN.SIGNUP, data);
  }

  /**
   * This function used to send the data to the logging application through tcp protocol to login
   * LOGGING_PATTERN.LOGIN is the pattern to be used to send the data
   * @param data data is received from the logging controller and the data to be sent to the logging application through the payload to be sent
   */
  login(data: CreateUserDto) {
    return this.loggingClient.send(LOGGING_PATTERN.LOGIN, data);
  }
}
