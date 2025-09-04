import { CreateProductDto } from '@app/contracts/product/create-product.dto';
import { PRODUCT_PATTERN } from '@app/contracts/product/product.pattern';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICE_CLIENT } from '../constants';

@Injectable()
export class ProductService {
  constructor(
    @Inject(MICROSERVICE_CLIENT.PRODUCT) private productClient: ClientProxy,
  ) {}

  CreateProduct(data: CreateProductDto, file: Express.Multer.File) {
    return this.productClient.send(PRODUCT_PATTERN.CREATE, { data, file });
  }

  GetAllProducts() {
    return this.productClient.send(PRODUCT_PATTERN.GET_ALL, {});
  }

  GetProductById(id: number) {
    return this.productClient.send(PRODUCT_PATTERN.GET_ONE, id);
  }

  UpdateProduct(id: number, data: any) {
    return this.productClient.send(PRODUCT_PATTERN.UPDATE, { id, data });
  }

  DeleteProduct(id: number) {
    return this.productClient.send(PRODUCT_PATTERN.DELETE, id);
  }
}
