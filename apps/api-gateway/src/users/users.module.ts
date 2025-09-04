import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtStrategy } from '@app/contracts/shared/jwt/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { SchemasModule } from '@app/contracts/shared/mongodb-database/shemas.module';
import { MICROSERVICE_CLIENT } from '../constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_CLIENT.USER,
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
    ]),
    SchemasModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, ConfigService],
})
export class UsersModule {}
