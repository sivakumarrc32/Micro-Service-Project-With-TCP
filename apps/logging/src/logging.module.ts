import { Module } from '@nestjs/common';
import { LoggingController } from './logging.controller';
import { LoggingService } from './logging.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '@app/contracts/shared/jwt/jwt.strategy';
import { JWTModule } from '@app/contracts/shared/jwt/jwt.module';
import { MongodbModule } from '@app/contracts/shared/mongodb-database/mongodb.module';
import { SchemasModule } from '@app/contracts/shared/mongodb-database/shemas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/logging/.env',
    }),
    JWTModule,
    SchemasModule,
    MongodbModule,
  ],
  controllers: [LoggingController],
  providers: [LoggingService, JwtStrategy],
})
export class LoggingModule {}
