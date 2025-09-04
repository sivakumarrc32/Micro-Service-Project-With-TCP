import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FileModule } from '@app/contracts/shared/multer/multer.module';
import { EntityModule } from '@app/contracts/shared/postgres-database/entity.module';
import { MICROSERVICE_CLIENT } from '../constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_CLIENT.PRODUCT,
        transport: Transport.TCP,
        options: { port: 3003 },
      },
    ]),
    FileModule,
    EntityModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
