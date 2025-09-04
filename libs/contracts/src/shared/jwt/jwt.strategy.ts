import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'apps/logging/src/logging.schema';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * The constructor for the JWT strategy.
   *
   * The constructor takes the `ConfigService` and the `Model<User>` as parameters.
   * It calls the parent constructor and sets up the options for the JWT strategy.
   *
   * @param {ConfigService} configService - The `ConfigService` to get the secret key from
   * @param {Model<User>} Users - The model for the user document
   */
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private Users: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  /**
   * The validate method for the JWT strategy.
   *
   * This method is called when the JWT is verified and the payload is extracted.
   * It takes the payload as a parameter and returns a user object if the user is found,
   * otherwise it throws an UnauthorizedException.
   *
   * @param {Object} payload - The payload of the JWT
   * @returns {Promise<User>} - The user object if the user is found
   * @throws {UnauthorizedException} - If the user is not found
   */
  async validate(payload: { id: string }) {
    const user = await this.Users.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException('You are not authorized');
    }

    return user;
  }
}
