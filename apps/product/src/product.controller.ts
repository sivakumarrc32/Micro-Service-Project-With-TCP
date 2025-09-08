import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PRODUCT_PATTERN } from '@app/contracts/product/product.pattern';
import { UpdateProductDto } from '@app/contracts/product/update-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern(PRODUCT_PATTERN.CREATE)
  createProduct(@Payload() payload: { data: any; file: any }) {
    const { data, file } = payload;
    try {
      const serviceStart = process.hrtime.bigint();
      const result = this.productService.CreateProduct(data, file);
      const serviceEnd = process.hrtime.bigint();
      console.log(
        `
        [MICROSERVICE] Request for signup received at ${Number(serviceStart) / 1_000_000} ms
        [MICROSERVICE] Processing time: ${(Number(serviceEnd - serviceStart) / 1_000_000).toFixed(3)} ms`,
      );
      return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return {
          message: e.message,
        };
      }
      return {
        message: 'Something went wrong',
      };
    }
  }

  @MessagePattern(PRODUCT_PATTERN.GET_ALL)
  getAllProducts() {
    try {
      const serviceStart = process.hrtime.bigint();
      const result = this.productService.GetAllProducts();
      const serviceEnd = process.hrtime.bigint();
      console.log(
        `
        [MICROSERVICE] Request for signup received at ${Number(serviceStart) / 1_000_000} ms
        [MICROSERVICE] Processing time: ${(Number(serviceEnd - serviceStart) / 1_000_000).toFixed(3)} ms`,
      )
      return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return {
          message: e.message,
        };
      }
      return {
        message: 'Something went wrong',
      };
    }
  }

  @MessagePattern(PRODUCT_PATTERN.GET_ONE)
  getProductById(@Payload() id: number) {
    try {
      const serviceStart = process.hrtime.bigint();
      const result = this.productService.GetProductById(id);
      const serviceEnd = process.hrtime.bigint();
      console.log(
        `
        [MICROSERVICE] Request for signup received at ${Number(serviceStart) / 1_000_000} ms
        [MICROSERVICE] Processing time: ${(Number(serviceEnd - serviceStart) / 1_000_000).toFixed(3)} ms`,
      )
      return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return {
          message: e.message,
        };
      }
      return {
        message: 'Something went wrong',
      };
    }
  }

  @MessagePattern(PRODUCT_PATTERN.UPDATE)
  updateProduct(@Payload() payload: { id: number; data: UpdateProductDto }) {
    const { id, data } = payload;
    try {
      const serviceStart = process.hrtime.bigint();
      const result = this.productService.UpdateProduct(id, data);
      const serviceEnd = process.hrtime.bigint();
      console.log(
        `
        [MICROSERVICE] Request for signup received at ${Number(serviceStart) / 1_000_000} ms
        [MICROSERVICE] Processing time: ${(Number(serviceEnd - serviceStart) / 1_000_000).toFixed(3)} ms`,
      )
      return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return {
          message: e.message,
        };
      }
      return {
        message: 'Something went wrong',
      };
    }
  }

  @MessagePattern(PRODUCT_PATTERN.DELETE)
  deleteProduct(@Payload() id: number) {
    try {
      const serviceStart = process.hrtime.bigint();
      const result = this.productService.DeleteProduct(id);
      const serviceEnd = process.hrtime.bigint();
      console.log(
        `
        [MICROSERVICE] Request for signup received at ${Number(serviceStart) / 1_000_000} ms
        [MICROSERVICE] Processing time: ${(Number(serviceEnd - serviceStart) / 1_000_000).toFixed(3)} ms`,
      )
      return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return {
          message: e.message,
        };
      }
      return {
        message: 'Something went wrong',
      };
    }
  }
}
