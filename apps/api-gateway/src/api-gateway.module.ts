import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UsersModule } from './users/users.module';
import { LoggingModule } from './logging/logging.module';
import { ConfigModule } from '@nestjs/config';
import { MongodbModule } from '@app/contracts/shared/mongodb-database/mongodb.module';
// import { JwtStrategy } from '@app/contracts/shared/jwt/jwt.strategy';
import { JWTModule } from '@app/contracts/shared/jwt/jwt.module';
// import { SchemasModule } from '@app/contracts/shared/mongodb-database/shemas.module';
import { ProductModule } from './product/product.module';
import { PostgresDBModule } from '@app/contracts/shared/postgres-database/postgresdb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    LoggingModule,
    MongodbModule,
    PostgresDBModule,
    JWTModule,
    ProductModule,
    // SchemasModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
