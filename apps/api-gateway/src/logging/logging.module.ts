import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SchemasModule } from '@app/contracts/shared/mongodb-database/shemas.module';
import { JWTModule } from '@app/contracts/shared/jwt/jwt.module';
import { JwtStrategy } from '@app/contracts/shared/jwt/jwt.strategy';
import { MICROSERVICE_CLIENT } from '../constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_CLIENT.LOGGING,
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
    JWTModule,
    SchemasModule,
  ],
  controllers: [LoggingController],
  providers: [LoggingService, JwtStrategy],
})
export class LoggingModule {}
