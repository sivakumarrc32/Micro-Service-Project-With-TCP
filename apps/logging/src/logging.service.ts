import { CreateUserDto } from '@app/contracts/logging/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './logging.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LoggingService {
  /**
   * Constructs a new LoggingService instance.
   * @param Users The Mongoose model for User document.
   * @param jwtService The JwtService instance to generate JWT tokens.
   */
  constructor(
    @InjectModel(User.name) private Users: Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Signs up a new user.
   * @param data The user data received from the logging application controller
   * @returns The result of the signup operation
   * @throws BadRequestException if the user already exists
   */
  async signup(data: CreateUserDto) {
    console.log('data in service', data);
    const user = await this.Users.findOne({ email: data.email });
    console.log('user', user);
    if (user) {
      console.log('user already exists', user);
      throw new RpcException({
        status: 400,
        message: 'User already exists',
      });
    }
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await this.Users.create({
      email: data.email,
      password: hash,
      role: data.role,
    });
    return {
      status: 200,
      message: 'User created successfully',
      user: newUser,
    };
  }

  /**
   * Logs in an existing user.
   * @param data The user data received from the logging application controller
   * @returns The result of the login operation
   * @throws BadRequestException if the user is not found
   * @throws BadRequestException if the password is invalid
   */
  async login(data: CreateUserDto) {
    const user = await this.Users.findOne({ email: data.email });
    if (!user) {
      throw new RpcException({
        status: 404,
        message: 'User not found',
      });
    }
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new RpcException({
        status: 400,
        message: 'Invalid password',
      });
    }
    const token = this.jwtService.sign({ id: user._id, role: user.role });
    return {
      status: 201,
      message: 'User logged in successfully',
      user,
      token,
    };
  }
}
