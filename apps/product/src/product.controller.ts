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
      const result = this.productService.CreateProduct(data, file);
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
      const result = this.productService.GetAllProducts();
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
      const result = this.productService.GetProductById(id);
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
      const result = this.productService.UpdateProduct(id, data);
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
      const result = this.productService.DeleteProduct(id);
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
