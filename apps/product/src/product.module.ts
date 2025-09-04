import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { EntityModule } from '@app/contracts/shared/postgres-database/entity.module';
import { PostgresDBModule } from '@app/contracts/shared/postgres-database/postgresdb.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/product/.env',
    }),
    EntityModule,
    PostgresDBModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
