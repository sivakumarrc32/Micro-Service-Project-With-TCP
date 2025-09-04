import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
// import { LoggingModule } from 'apps/logging/src/logging.module';
import { SchemasModule } from '@app/contracts/shared/mongodb-database/shemas.module';
import { MongodbModule } from '@app/contracts/shared/mongodb-database/mongodb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SchemasModule,
    MongodbModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
